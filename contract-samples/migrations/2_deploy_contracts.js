const Sample = artifacts.require("Sample");
const Attack = artifacts.require("Attack");
const EtherStore = artifacts.require("EtherStore");

module.exports = async (deployer) => {
  await deployer.deploy(Sample);
  await deployer.deploy(EtherStore);
  await deployer.link(EtherStore, Attack);
  await deployer.deploy(Attack, `${EtherStore.address}`);
};
