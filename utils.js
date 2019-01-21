'use strict';

function selectAccount(accounts, address) {
    if (!address) return accounts[0];
    return accounts.find(a => a === address) || accounts[0];
}

function validateConfig(config) {
    let errors = [];

    if (!config) {
        addError('Contract configuration is required', errors);
        return throwErrors(errors);
    }
    
    if (!config.contract.name)
        addError('Contract name is required, check your config.js file', errors);

    if (!config.contract.fileName)
        addError('Contract file name is required, check your config.js file', errors);

    if (!config.transaction.network)
        addError('The network where you want to deploy your contract is required', errors);

    if (!config.transaction.phrase)
        addError('The mnemonic phrase is required to unlock your accounts, check your config.js file', errors);

    if (!validatePhrase(config.transaction.phrase))
        addError('Invalid mnemonic phrase, check your config.js file', errors);

    throwErrors(errors);
}

function addError(errorMessage, errors) {
    errors.push(new Error(errorMessage));
}

function throwErrors(errors) {
    if (!errors.length) return;

    let throws = 'Errors:\n';

    for (let error of errors) {
        throws += error.message + '\n';
    }

    console.error(throws);
    process.exit();
}

function validatePhrase(phrase){
	return phrase.split(' ').length === 12
}

module.exports = { 
    selectAccount,
    validateConfig,
    rootDirectory: __dirname
};