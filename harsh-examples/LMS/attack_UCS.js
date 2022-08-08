const Marks_UCS = artifacts.require("Marks_UCS");
//const stringUtils = artifacts.require("stringUtils");

module.exports = async (callback) => {

    var accounts = await web3.eth.getAccounts();
    var marksInst = await Marks_UCS.deployed();
    //var strInst = await stringUtils.deployed();
    
    try {
        var insert1 = await marksInst.insert( accounts[2], [45,46,47,44,44]);
        //console.log(insert1);
        var insert2 = await marksInst.insert( accounts[3], [25,30,35,35,45]);
        //console.log(insert2);

        var insert3 = await marksInst.insert( accounts[4],[10,20,30,40,45]);
        
    } catch (err){
        console.log("Error")
        console.log(err)
    }
    
    

    try{
        console.log('Bug Triggering Code');
        var oldg = await marksInst.getGrade(accounts[4]);
        var olds = await marksInst.getStatus(accounts[4]);
        console.log(`Old Grade : ${oldg.toString()}`);
        console.log(`Old Status : ${olds.toString()}`);
        var t1 = await marksInst.graceMarks(accounts[4]);
        var newg = await marksInst.getGrade(accounts[4]);
        console.log(`New Grade : ${newg.toString()}`)
        var news = await marksInst.getStatus(accounts[4]);
        console.log(`New Grade : ${news.toString()}`)
    
    } catch(err){
        console.log('Bug Triggered')
        console.log(err)
    }

     console.log('Non-Bug Triggering Code');

    try{
   
        var oldg = await marksInst.getGrade(accounts[2]);
        var olds = await marksInst.getStatus(accounts[2]);
        console.log(`Old Grade : ${oldg.toString()}`);
        console.log(`Old Status : ${olds.toString()}`);
        var t1 = await marksInst.graceMarks(accounts[2]);
        var newg = await marksInst.getGrade(accounts[2]);
        console.log(`New Grade : ${newg.toString()}`)
        var news = await marksInst.getStatus(accounts[2]);
        console.log(`New Grade : ${news.toString()}`)
    //console.log(t2);
}catch(err){
        console.log('Error')
        console.log(err)
    }

    try{

        var oldg = await marksInst.getGrade(accounts[3]);
        var olds = await marksInst.getStatus(accounts[3]);
        console.log(`Old Grade : ${oldg.toString()}`);
        console.log(`Old Status : ${olds.toString()}`);
        var t1 = await marksInst.graceMarks(accounts[3]);
        var newg = await marksInst.getGrade(accounts[3]);
        console.log(`New Grade : ${newg.toString()}`)
        var news = await marksInst.getStatus(accounts[3]);
        console.log(`New Grade : ${news.toString()}`)
}catch(err){
        console.log('Error')
        console.log(err)
    }



}