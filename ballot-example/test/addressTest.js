const Address = artifacts.require("Address");

contract('Address', (accounts) => {
  it('Should return 10 addresses', async () => {
    const addressInstance = await Address.deployed();
    const addresses = await addressInstance.getBytes32ArrayForInput.call();
      console.log(addresses);
  });
});