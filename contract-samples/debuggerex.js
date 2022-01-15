const Debugger = require("@truffle/debugger");
const { Compile } = require("@truffle/compile-solidity");
const Sample = artifacts.require("Sample");
const path = require("path");
const ganache = require("ganache-core");
const fse = require("fs-extra");
let { ast, data, evm, solidity, trace } = Debugger.selectors;

// https://github.com/trufflesuite/truffle/blob/master/packages/debugger/test/solidity.js

module.exports = async (callback) => {
    
    const httpProvider = new web3.providers.HttpProvider("http://127.0.0.1:7545");
    const ganacheOptions = {
        host: "localhost",    // Localhost (default: none)
        port: 7545,           // Standard Ethereum port (default: none)
        network_id: "*",      // Any network (default: none)
        fork: httpProvider
    };
    
    const provider = await ganache.provider(ganacheOptions);
    
    console.log("[+] Connected to Ganache Instance.");
    console.log(`[+] ${provider}`);
    
    const soliditySource =  await fse.readFile(
        path.join(__dirname, "./contracts/Sample.sol"),
            "utf-8"
    );
    
    var SampleSM = { "Sample.sol": soliditySource };
       
    const compileOptions = {
        contracts_directory: "./contracts",
        working_directory: ".",
        compilers: {
          solc: {
            version: "0.8.11",
            settings: {
              optimizer: {
                enabled: false,
                runs: 200
              }
            }
          }
        },
        quiet: false
      };

    const { compilations } = await Compile.sources({
        sources: SampleSM,
        options: compileOptions
    });
    
    console.log("[+] Compilation Completed.");
    
    const sampleInstance = await Sample.deployed();
    var accounts = await web3.eth.getAccounts();
    
    console.log("[+] Contract Instance found.");
    
    var res = await sampleInstance.sendContractEther(0, 1, 0, {
            from: accounts[0], value: web3.utils.toWei('1', 'ether')
    });
    
    console.log(`[+] Transaction Completed. ${res.tx}`);
    
    try{
        let bugger = await Debugger.forTx(res.tx, {
            provider,
            compilations,
            lightMode: false
        });
        
        let session = bugger.connect();
        await session.ready();
        // await session.stepInto();
        
        // let variables = session.view(data.current.identifiers.native);
        // let sourceRange = session.view(solidity.current.sourceRange);
        // console.log(sourceRange)
        
        let source = bugger.view(solidity.current.sources);
        let traceView = await bugger.view(trace.finished)
        console.log(source.id)
        
        console.log("[+] Trace View.");
        console.log(traceView);
        
        let breakpoint = { sourceId: source.id, line: 36 };
        console.log(breakpoint);
        
        do {
          await bugger.continueUntilBreakpoint([breakpoint]);
          if (!bugger.view(trace.finished)) {
            let range = bugger.view(solidity.current.sourceRange);
            console.log("[+] Debugging.");
          }
        } while (!bugger.view(trace.finished));
        
    } catch (err) {
        console.log(err);
    };
    
};