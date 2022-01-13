const Test = artifacts.require("Test.sol");

let Main =  async (callback) => {   
   
    let TestHook = async () => {
        const sampleInstance = await Test.deployed();
        var accounts = await web3.eth.getAccounts()
        var newBal = await web3.eth.getBalance(accounts[0])
        
        console.log(sampleInstance.address)
        console.log(newBal)
    
        var result = await sampleInstance.testAdhoc(50, 1);
        console.log(result.toString())
        
        // No transfer if contract creater and msg.sender are
        // same. Say accounts[0] was used to create, use a different account
        // accounts[1] call this function. This will deposit Ether 
        // to account creator's contract address.
        // COMMENT :
        // Owner is address[0] if that is used to 
        // create the contract.
        // var result = await sampleInstance.depositOwner({
        //         from: accounts[1], 
        //         // Value can't be zero or empty for this 
        //         // call to pass through.
        //         value: web3.utils.toWei('0.08', 'ether')
        //     });
            
        // console.log(result)
        
        // web3.utils.toWei('1', 'ether') else goes to fallback since
        // arguments error.
        // COMMENT :
        // Correct is to use web3.utils.toWei('x', 'ether')
        // Transfer's from contract's funds/address "amount" ether if
        // from is not supplied, else address in "from" used as source 
        // to transfer ether to "arg1", address. 
        // ASSERT : Ether is deducted from contract if from is unspecified, 
        // else revert/error occurs given contract has less ether than 
        // amount to be sent.
        // var result = await sampleInstance.transferEther(
        //     accounts[1],
        //     web3.utils.toWei('1', 'ether'), 
        //     // {
        //     //     from: accounts[1], 
        //     //     // Value can't be zero or empty for this 
        //     //     // call to pass through.
        //     //     gas: 1000000,
        //     //     value: web3.utils.toWei('2', 'ether')
        //     // }
        // );
        
        // COMMENT :
        // From account to args2 address account.
        // transfer : b * (1 ether) if msg.value >= b * (1 ether)
        // [23:48:23]  Transaction: 0xf6549acc5e359400e1068c3429947139a7723f8e23a72e6ea8ab1dc6256548c2
        // [23:48:24]  Gas usage: 6721974
        // [23:48:24]  Block Number: 40
        // [23:48:24]  Block Time: Thu Jan 13 2022 23:48:23 GMT+0530 (India Standard Time)
        // [23:48:24]  Runtime Error: out of gas
        // Extra ether sent with the transaction is now with 
        // contract.
        
        // COMMENT : Get base gas level. (Threshold).
        Test.web3.eth.getGasPrice((error, result) => { 
            var gasPrice = Number(result);
            console.log("Gas Price is " + gasPrice + " wei"); // "10000000000000"
            // Get Contract instance
            Test.deployed().then((instance) => {
                // Use the keyword 'estimateGas' after the function name to get 
                // the gas estimation for this particular function 
                return instance.transferToAddressStub.estimateGas(
                    100, // args0
                    800, // args1
                    accounts[0],
                    {
                        from: accounts[1], 
                        // Value can't be zero or empty for this 
                        // call to pass through.
                        value: web3.utils.toWei('400', 'ether') // msg.value
                    }
                )
            }).then((result) => {
                // COMMENT : Print Threshold.
                // ASSERT Constraint-5 : Threshold == gas
                var gas = Number(result);
                console.log("gas estimation = " + gas + " units");
                console.log("gas cost estimation = " + (gas * gasPrice) + " wei");
                console.log("gas cost estimation = " + Test.web3.utils.fromWei(
                    web3.utils.toBN(gas * gasPrice), "ether") + " ether"
                );
            });
        });
        
        // ASSERT Internal Constant : ether_weight = 0.5 ether
        var contract_balance = await sampleInstance.getContractBalance();
        console.log(contract_balance.toString())
        // ASSERT Constraint-1 : contract_balance + msg.value == args1 * ether_weight. 
        // ASSERT Constraint-2 : args0 != 0. (Internal Constraint)
        // ASSERT Constraint-3 : Gas Limit <= Max Gas Block Limit.
        // ASSERT Constraint-4 : Gas Limit >= Threshold.
        
        // COMMENT : Sample Gas Output Pair.
        // Gas Price is 20000000000 wei
        // gas estimation = 5071439 units
        // gas cost estimation = 101428780000000000 wei
        // gas cost estimation = 0.10142878 ether
        const satPair = {
            inputs : [100, 500],
            gasPrice : "20000000000 wei",
            gas_threshold : 5071439, 
            value: 250
        }
        
        // Gas Price is 20000000000 wei
        // gas estimation = 8100239 units
        // gas cost estimation = 162004780000000000 wei
        // gas cost estimation = 0.16200478 ether
        // ASSERT Fail : 8100239 > Max Gas Block Limit (6721975)
        const unsatPair = {
            inputs : [100, 800],
            gasPrice : "20000000000 wei",
            gas_threshold : 8100239,
            value: 400
        }

        var result = await sampleInstance.transferToAddressStub(
            satPair.inputs[0], // args0
            satPair.inputs[1], // args1
            accounts[0],
            {
                from: accounts[1], 
                // Value can't be zero or empty for this 
                // call to pass through.
                gas: satPair.gas_threshold,
                value: web3.utils.toWei(satPair.value.toString(), 'ether') // msg.value
            }
        );
        
        // console.log(result)
        
        // var result = await sampleInstance.depositContract({
        //     from: accounts[0], value: web3.utils.toWei('57', 'ether')
        // });
        
        console.log(result);
        
        var result = await sampleInstance.getContractBalance();
        console.log(result.toString())
                
        var result = await sampleInstance.getOwnerBalance();
        console.log(result.toString())
                
        var result = await sampleInstance.getBalanceSender();
        console.log(result.toString())
        
    }
    
    // COMMENT :
    TestHook().then(a => console.log("Done With Calls."));
}

module.exports = Main;

// {
//       logIndex: 98,
//       transactionIndex: 0,
//       transactionHash: '0x252f0cfd9a981945cbff28379b884d2ff14d4b936420c5468be72db831e0f4dd',
//       blockHash: '0xd65c437c853246b345c35472866554325785c8c68a373980dc50d5a6d4290465',
//       blockNumber: 54,
//       address: '0x52f736E381a9d7234AC26f71Cfb8f1892FAE7d91',
//       type: 'mined',
//       id: 'log_483e9bcc',
//       event: 'Looper',
//       args: [Result]
//     },
//     {
//       logIndex: 99,
//       transactionIndex: 0,
//       transactionHash: '0x252f0cfd9a981945cbff28379b884d2ff14d4b936420c5468be72db831e0f4dd',
//       blockHash: '0xd65c437c853246b345c35472866554325785c8c68a373980dc50d5a6d4290465',
//       blockNumber: 54,
//       address: '0x52f736E381a9d7234AC26f71Cfb8f1892FAE7d91',
//       type: 'mined',
//       id: 'log_980560e9',
//       event: 'Looper',
//       args: [Result]
//     },
//     ... 400 more items
// }