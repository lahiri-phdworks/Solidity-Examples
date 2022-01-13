const Test = artifacts.require("Test");

let Main =  async () => {   
   
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
        var result = await sampleInstance.depositOwner({
                from: accounts[1], 
                // Value can't be zero or empty for this 
                // call to pass through.
                value: web3.utils.toWei('1', 'ether')
            });
        console.log(result)
        
        // web3.utils.toWei('1', 'ether') else goes to fallback since
        // arguments error.
        // Correct is to use web3.utils.toWei('1', 'ether')
        // Transfer's from contract's funds/address "amount" ether if
        // from is not supplied, else address in "from" used as source 
        // to transfer ether to "arg1", address. 
        var result = await sampleInstance.transferEther(
            accounts[0],
            // amount <= msg.value else SM reverts.
            web3.utils.toWei('2', 'ether'), 
            {
                from: accounts[1], 
                // Value can't be zero or empty for this 
                // call to pass through.
                gas: 1000000,
                value: web3.utils.toWei('2', 'ether')
            }
        );
        
        // From account to args2 address account.
        // transfer : b * (1 ether) if msg.value >= b * (1 ether)
        var result = await sampleInstance.transferToAddressStub(
            100,
            1,
            accounts[0],
            {
                from: accounts[1], 
                // Value can't be zero or empty for this 
                // call to pass through.
                gas: 1000000,
                value: web3.utils.toWei('1', 'ether')
            }
        );
        
        console.log(result)
        
        var result = await sampleInstance.getBalance();
        console.log(result.toString())
                
        var result = await sampleInstance.getContractBalance();
        console.log(result.toString())
                
        var result = await sampleInstance.getBalanceSender();
        console.log(result.toString())
        
    }
    
    TestHook().then(a => console.log("Done With Calls."));
}

module.exports = Main;