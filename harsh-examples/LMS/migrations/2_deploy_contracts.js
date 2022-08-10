const Marks_UCS = artifacts.require("Marks_UCS");
const Marks_Reent = artifacts.require("Marks_Reent");
const Marks = artifacts.require("Marks");
const MarksOg = artifacts.require("MarksOg");
const stringUtils = artifacts.require("StringUtils");


module.exports = async (deployer) => {

  await deployer.deploy(stringUtils);
  await deployer.link(stringUtils, Marks);
  await deployer.deploy(Marks);
  await deployer.link(stringUtils, MarksOg);
  await deployer.deploy(MarksOg);
  await deployer.link(stringUtils, Marks_UCS);
  await deployer.deploy(Marks_UCS);
  await deployer.link(stringUtils, Marks_Reent);
  await deployer.deploy(Marks_Reent);
  

};
