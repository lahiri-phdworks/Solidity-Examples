const Sample = artifacts.require("Sample");

module.exports = async function(callback) {

    const sampleInstance = await Sample.deployed()
    var accounts = await web3.eth.getAccounts()
    var newBal = await web3.eth.getBalance(accounts[0])
    
    console.log(sampleInstance.address)
    console.log(newBal)

    var result = await sampleInstance.addNums1(50, 1)
    console.log(result)
    
    var result = await sampleInstance.rectangle(50, 1)
    console.log(result)
    
    var result = await sampleInstance.getBalanceOwn()
    console.log(result.toString())
    
    // Exceed the gass block limit : 300000000,  30000000  
    var result = await sampleInstance.transferToAddressStub(100, 1, 
        accounts[0], {from: sampleInstance, gas: 110000, value: web3.utils.toWei('1', 'ether')})
    console.log(result);
    var newBal = await web3.eth.getBalance(accounts[0]);
    console.log(newBal);
    
    var res = await sampleInstance.getBalance();
    console.log(res.toString())
    
    // var res = await sampleInstance.transferEther(accounts[5]);
    // console.log(res);
    
    // web3.eth.sendTransaction({
    //     from: sampleInstance,
    //     to: accounts[5].address, 
    //     value: web3.utils.toWei('1', 'ether'), 
    // }, function(err, transactionHash) {
    //     if (err) { 
    //         console.log(err); 
    //     } else {
    //         console.log(transactionHash);
    //     }
    // });

}