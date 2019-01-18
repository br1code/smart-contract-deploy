'use strict';

const fs = require('fs');
const path = require('path');
const solc = require('solc');
const utils = require('../utils');

const Config = {
    language: 'Solidity',
    settings: { outputSelection: { '*': { '*': ['*'] } } }
};

/**
 * Compiles a single contract and returns a JavaScript Object of it. 
 * Make sure to save your Solidity files in the 'contracts' directory 
 * and only have ONE contract defined in your file, otherwise it will be ignored
 * @param {string} contractName - The name of the contract < Ex: contract ContractName { } >
 * @param {string} fileName - The name of the Solidity file < Ex: 'contract.sol' >
 */
function Compile(contractName, fileName, callback) {
    if (!contractName || !fileName || !callback)
        utils.exitWithMessage('The contract file and name are required to compile.\nThe callback is required');

    const contractPath = path.resolve(utils.rootDirectory, 'contracts', fileName);

    console.log('Reading contract file ...');

    fs.readFile(contractPath, 'utf8', (error, sourceCode) => {

        if (error || !sourceCode) {
            let errorMessage = 'The solidity file could not be read, make sure your file is saved in';
            utils.exitWithMessage(`${errorMessage} ${utils.rootDirectory}/contracts`);
        }
        
        let source = {
            language: Config.language,
            sources: { [fileName]: { content: sourceCode } },
            settings: Config.settings
        };

        console.log('Compiling ...')

        let output = JSON.parse(solc.compile(JSON.stringify(source)));

        let contract = {
            abi: output.contracts[fileName][contractName].abi,
            bytecode: '0x' + output.contracts[fileName][contractName].evm.bytecode.object
        };
        
        callback(contract);
    });
}

module.exports = { Config, Compile };