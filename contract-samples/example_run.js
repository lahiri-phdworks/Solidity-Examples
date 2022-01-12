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
    var result = await sampleInstance.whileTrue(100, 1, 
        accounts[1], {from: accounts[0], value: web3.utils.toWei('1', 'ether'), gas:999999})
    console.log(result.toString())

}