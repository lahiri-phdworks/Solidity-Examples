## Running Examples

Make sure you have [`Ganache`](https://www.trufflesuite.com/ganache) test blockchain running locally in your machine.
Run `*.AppImage` with `chmod a+x` from the download site.

- Make sure `Node.js` & `npm` package manager is installed and accessible from the command line along with `truffle`.

  - [Node.js](https://nodejs.org/en/)
  - [Truffle](https://github.com/trufflesuite/truffle)

- Re-entrancy Attack is setup in `contracts/Attack.sol` & `contract/EtherStore.sol`. Adapted from [`Solidity by Example`](https://solidity-by-example.org/hacks/re-entrancy/)

```bash
# setting up
$ npm install --save
$ npm install -g truffle ganache-cli
```

- Start `ganache` AppImage.

- Run Truffle Compile to compile the example contracts to ABI format for deployment to blockchain.

```bash
$ truffle compile
```

- Truffle Migrate : This will deploy the compiled smart contracts to the ganache blockchain (testnet).
- Check `migrations` folder for how to link and deploy smart contracts on the blockchain.
- The `development` network is setup to run with ganache. Make sure ganache is running.

```bash
$ truffle migrate --network development

# Reset and re-deploy
$ truffle migrate --reset --network development
```

- Running the functions in the contracts. Truffle can be used to interact and run the functions in the smart contracts.
- Here we are running the functions from the `contract/Sample.sol` smart contract. See `example_run.js` for more information.

```bash
$ truffle exec example_run.js --network development

    Using network 'development'.

    0xa4b8A8e0d41373Da49bde33ad32e0E70a8F13297
    93630324600000000000

    ...
```

- Running the attack. You will see your balance getting updated. `account[0]` is the account of the attacker.
- Ganache gives `10` accounts each starting with `100.00` Eth.
- After the attack, `account[0]` must end up with more `ether` than it started with !!.

```bash
$ truffle exec attack.js --network development
# press Ctrl+C to exit
```
