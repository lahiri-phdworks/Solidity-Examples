const Sample = artifacts.require("./Sample.sol")

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
}