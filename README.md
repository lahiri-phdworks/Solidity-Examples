# Solidity-Examples

- Follow the tutorials here : [Truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation)
- Make sure `Node.js` & `npm` package manager is installed and accessible from the command line.
  - [Node.js](https://nodejs.org/en/)
  - [Truffle](https://github.com/trufflesuite/truffle)

## Running Examples

Make sure you have [`Ganache`](https://www.trufflesuite.com/ganache) test blockchain running locally in your machine. Run `*.AppImage` in `ganache-blockchain` folder. (not included for GIT LFS)

- [QuickStart](https://www.trufflesuite.com/docs/truffle/quickstart)
- [Compiling a Contract using truffle.](https://www.trufflesuite.com/docs/truffle/getting-started/compiling-contracts)
- [Using Truffle Console for development.](https://www.trufflesuite.com/docs/truffle/getting-started/using-truffle-develop-and-the-console)
- [Truffle with MetaMask Wallet. (Needed if want to test on a public testnet)](https://www.trufflesuite.com/docs/truffle/getting-started/truffle-with-metamask)
- [Executing external scripts with truffle, interacting with the smart contract](https://www.trufflesuite.com/docs/truffle/getting-started/writing-external-scripts)

```bash
$ cd ballot-example

$ truffle compile
    ...
    Compiling your contracts...
    ===========================
    ✔ Fetching solc version list from solc-bin. Attempt #1
    > Compiling ./contracts/Address.sol
    > Compiling ./contracts/Ballot.sol
    > Compiling ./contracts/Migrations.sol

$ truffle migrate
    ...
    Compiling your contracts...
    ===========================
    ✔ Fetching solc version list from solc-bin. Attempt #1
    > Everything is up to date, there is nothing to compile.

    Network up to date.

$ truffle deploy
    ...

# For testing
$ truffle test
    ...
    Using network 'development'.


    Compiling your contracts...
    ===========================
    ✔ Fetching solc version list from solc-bin. Attempt #1
    > Compiling ./test/4_Ballot_test.sol
    ✔ Fetching solc version list from solc-bin. Attempt #1
    > Artifacts written to /tmp/test--288401-NgXp0VWd8kTu
    > Compiled successfully using:
    - solc: 0.7.6+commit.7338295f.Emscripten.clang



    Contract: Address
    [
    '0x53756d6974000000000000000000000000000000000000000000000000000000',
    '0x5261766900000000000000000000000000000000000000000000000000000000',
    '0x52616a616e000000000000000000000000000000000000000000000000000000',
    '0x5261676875000000000000000000000000000000000000000000000000000000',
    '0x45746865724b696e670000000000000000000000000000000000000000000000',
    '0x5368656b68617200000000000000000000000000000000000000000000000000',
    '0x436f6e74726163746f7200000000000000000000000000000000000000000000',
    '0x50756c75626b0000000000000000000000000000000000000000000000000000',
    '0x426974636f696e4b696e67000000000000000000000000000000000000000000',
    '0x44616f4865636b65720000000000000000000000000000000000000000000000'
    ]
        ✓ Should return 10 addresses (43ms)


    1 passing (184ms)
```

## Other Commands

```bash
$ truffle exec src/getAddress.js --network development --compile
$ truffle console
...
$ truffle(development)> let instance = await MetaCoin.deployed()
...
$ truffle(development)> let accounts = await web3.eth.getAccounts()
$ truffle(development)> instance.sendCoin(accounts[1], 10, {from: accounts[0]})
...
...
$ truffle(development)> .exit
```

## Running Script

Logging and running each command from truffle console can be tedious.
We can use a script (written in JavaScript) to execute on development network. See ([truffle-run.js](#contract-samples/truffle-run.js))

```bash
$ truffle exec ./truffle-run.js --network development
...

Using network 'development'.

0xdAd324Ac3f539785b8E02329fFd34e7657a16064
99713108700000000000
```
