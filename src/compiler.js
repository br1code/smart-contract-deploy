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
 * and only have ONE contract defined in your file, otherwise it will be ignored.
 * @param {Object} contractData - The name and file name of the contract
 */
function Compile(contractData) {      
    let contractPath = path.resolve(utils.rootDirectory, 'contracts', contractData.fileName);

    console.log('Reading the file ...');

    let contentFile = fs.readFileSync(contractPath, 'utf8');

    let source = {
        language: Config.language,
        settings: Config.settings,
        sources: { [contractData.fileName]: { content: contentFile } }
    };

    console.log('Compiling ...');

    let output = JSON.parse(solc.compile(JSON.stringify(source)));

    return {
        abi: output.contracts[contractData.fileName][contractData.name].abi,
        bytecode: '0x' + output.contracts[contractData.fileName][contractData.name].evm.bytecode.object
    };
}

module.exports = { Config, Compile };