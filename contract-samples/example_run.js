const Sample = artifacts.require("Sample");

module.exports = async (callback) => {

    const sampleInstance = await Sample.deployed()
    var accounts = await web3.eth.getAccounts()
    var newBal = await web3.eth.getBalance(accounts[0])
    
    console.log(sampleInstance.address)
    console.log(newBal)

    var result = await sampleInstance.addNums1(50, 1)
    console.log(result.toString())
    
    var result = await sampleInstance.rectangle(50, 1)
    console.log(result.s.toString())
    console.log(result.p.toString())
    
    
    var result = await sampleInstance.getBalanceOwn()
    console.log(result.toString())
    
    var newBal = await web3.eth.getBalance(accounts[0]);
    console.log(newBal.toString());
    
    var res = await sampleInstance.getBalance();
    console.log(res.toString())
    
    var res = await sampleInstance.sendContractEther(1, 3, 7000, {
            from: accounts[0], value: web3.utils.toWei('1', 'ether')
     })
}