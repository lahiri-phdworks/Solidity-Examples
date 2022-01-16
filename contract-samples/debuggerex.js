const Debugger = require("@truffle/debugger");
const { Compile } = require("@truffle/compile-solidity");
const Sample = artifacts.require("Sample");
const path = require("path");
const Ganache = require("ganache-core");
const fse = require("fs-extra");
const Box = require("@truffle/box");
const Resolver = require("@truffle/resolver");
const Artifactor = require("@truffle/artifactor");
let { ast, data, evm, solidity, trace } = Debugger.selectors;
const Codec = require("@truffle/codec");
const loadash = require("lodash");
const WorkflowCompile = require("@truffle/workflow-compile");
const Web3 = require("web3");
	
// https://github.com/trufflesuite/truffle/blob/master/packages/debugger/test/solidity.js
// https://github.com/trufflesuite/truffle/blob/79d1cc27aee9918f328565035c30428c4b3f25d8/packages/debugger/test/helpers.js#L79

async function compile(config) {
  const { compilations } = await WorkflowCompile.compileAndSave(config);
  const contractNames = loadash.flatten(
    compilations.map(compilation =>
      compilation.contracts.map(contract => contract.contractName)
    )
  );
  return { compilations, contractNames };
}

module.exports = async (callback) => {
    
    const httpProvider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
    var web3 = new Web3(httpProvider);
    const ganacheOptions = {
        host: "localhost",    // Localhost (default: none)
        port: 7545,           // Standard Ethereum port (default: none)
        network_id: "*",      // Any network (default: none)
        fork: httpProvider
    };
    
    const provider = await Ganache.provider(ganacheOptions);
    var accounts = await web3.eth.getAccounts();
    console.log("[+] Connected to Ganache Instance.");
      
    const soliditySource =  await fse.readFile(
        path.join(__dirname, "./contracts/Sample.sol"),
            "utf-8"
    );
    
    var sources = { 
      "Sample.sol": soliditySource,
    };
    
    console.log("[+] Read Solidity Source.");
    
    let config = {
      contracts_directory: path.join(__dirname, "contracts"),
      working_directory: path.join(__dirname),
      contracts_build_directory: path.join(__dirname, "build/contracts"),
      compilers : {
        solc: {
          version: "0.8.9",
          settings: {
            optimizer: {
              enabled: false,
              runs: 200
            },
            evmVersion: "london"
          }
        },
        vyper: {
          settings: {
            evmVersion: "berlin"
          }
        }
      },
      quiet: false,
      all: true
    }
    config.resolver = new Resolver(config);
    config.artifactor = new Artifactor(config.contracts_build_directory);
    
    console.log("[+] Compilation Started.");
    let { contractNames, compilations: rawCompilations } = await compile(config);
    
    var contracts = [];
    rawCompilations.map(compilations => {
      compilations.contracts.map((contract) => {
          contracts.push(contract);
          console.log(`[+] Pushed Contract : ${contract.contractName}`);
          console.log(Object.keys(contract));
      })
    });
    
    let compilations = Codec.Compilations.Utils.shimCompilations(rawCompilations);
    
    // compilations.map(compileObj => {
    //   console.log(`[+] Compilation Id : ${compileObj.id}`);
    //   console.log(Object.keys(compileObj));
    //   console.log("[+] Contracts : ");
    //   compileObj.contracts.map((c) => {
    //     console.log(Object.keys(c));
    //   })
    //   console.log("[+] Sources : ");
    //   compileObj.sources.map((c) => {
    //     console.log(Object.keys(c));
    //   })
    // })
    
    console.log("[+] Compilation Completed.");
    console.log(contractNames);
    
    const sampleInstance = await Sample.deployed();
    console.log("[+] Contract Instance found.");
    await new Promise(r => setTimeout(r, 5000));
    var res = await sampleInstance.sendContractEther(0, 1, 0, {
            from: accounts[0], value: web3.utils.toWei('1', 'ether')
    });
    
    console.log(`[+] Transaction Completed. ${res.tx}`);
    await new Promise(r => setTimeout(r, 5000));
    
    try{
        await new Promise(r => setTimeout(r, 5000));
        let bugger = await Debugger.forTx(res.tx, {
            contracts: contracts,
            files: compilations,
            provider: provider,
            // compilations : rawCompilations,
            lightMode: true
        });
        
        let session = bugger.connect();
        await session.ready();
        await session.stepInto();
        
        console.log("[+] Sessions View.");
        await new Promise(r => setTimeout(r, 5000));
        var stats = await session.view(evm.transaction.status);
        console.log(stats);
        
        let source = session.view(solidity.current.sources);
        let traceView = await session.view(trace.finished)
        
        console.log("[+] Trace View.");
        console.log(traceView);
        
        await new Promise(r => setTimeout(r, 5000));
        let breakpoint = { sourceId: source.id, line: 36 };
        console.log(breakpoint);
        
        await bugger.runToEnd();
        await new Promise(r => setTimeout(r, 5000));
        const variables = Codec.Format.Utils.Inspect.unsafeNativizeVariables(
          await bugger.variables()
        );
        console.log(variables);
        
    } catch (err) {
        console.log(err);
    };
    
};