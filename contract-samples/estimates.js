var TestContract = artifacts.require("Sample.sol");

module.exports = (callback) => {
    TestContract.web3.eth.getGasPrice((error, result) => { 
        var gasPrice = Number(result);
        console.log("Gas Price is " + gasPrice + " wei"); // "10000000000000"
        // Get Contract instance
        TestContract.deployed().then((instance) => {
            // Use the keyword 'estimateGas' after the function name to get 
            // the gas estimation for this particular function 
            return instance.addNums1.estimateGas(5, 45);
        }).then((result) => {
            var gas = Number(result);
            console.log("gas estimation = " + gas + " units");
            console.log("gas cost estimation = " + (gas * gasPrice) + " wei");
            console.log("gas cost estimation = " + TestContract.web3.utils.fromWei(web3.utils.toBN(gas * gasPrice), "ether") + " ether");
        });
    });
};
