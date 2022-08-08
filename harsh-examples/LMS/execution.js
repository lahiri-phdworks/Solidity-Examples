const MarksOg = artifacts.require("MarksOg");
//const stringUtils = artifacts.require("stringUtils");

module.exports = async (callback) => {

    var accounts = await web3.eth.getAccounts();
    var marksInst = await MarksOg.deployed();
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
    
    try {
        var student1 = await marksInst.getIndMark(accounts[4],0);
        console.log(`student1 : ${student1.toString()}`)

        
    } catch (err){
        console.log("Error")
        //console.log(err)
    }

    try {
       var student3 = await marksInst.getIndMark(accounts[2],1);
        console.log(`student3 : ${student3.toString()}`)
    
    } catch (err){
        console.log("Error")
        //console.log(err)
    }

    try {
        var student4 = await marksInst.getIndMark(accounts[2],6);
    console.log(`student4 : ${student4.toString()}`)

        
    } catch (err){
        console.log("Error")
        //console.log(err)
    }


    var grade1 = await marksInst.getGrade(accounts[2]);
    console.log(`Grade 1 : ${grade1.toString()}`);

        try{
    
    var oldg = await marksInst.getGrade(accounts[4]);
    console.log(`Old Grade : ${oldg.toString()}`);

    var t1 = await marksInst.graceMarks(accounts[4]);
    var newg = await marksInst.getGrade(accounts[4]);
    console.log(`New Grade : ${newg.toString()}`)
    //console.log(t1.message.toString());
    
    } catch(err){
       
        console.log(err)
    }


    try{
    

    var oldg = await marksInst.getGrade(accounts[2]);
    console.log(`Old Grade : ${oldg.toString()}`);

    var t2 = await marksInst.graceMarks(accounts[2]);
    var newg = await marksInst.getGrade(accounts[2]);
    console.log(`New Grade : ${newg.toString()}`)
    //console.log(t2);
}catch(err){
        console.log('Error')
        console.log(err)
    }

    try{

    var oldg = await marksInst.getGrade(accounts[3]);
    console.log(`Old Grade : ${oldg.toString()}`);

    var t3 = await marksInst.graceMarks(accounts[3]);
    var newg = await marksInst.getGrade(accounts[3]);
    console.log(`New Grade : ${newg.toString()}`)
    //console.log(t3);
}catch(err){
        console.log('Error')
        console.log(err)
    }



}




