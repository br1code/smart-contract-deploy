'use strict';

function exitWithMessage(message) {
    console.error(message);
    process.exit();
}

function selectAccount(accounts, address) {
    if (!address) return accounts[0];
    return accounts.find(a => a === address) || accounts[0];
}

module.exports = { 
    selectAccount,
    exitWithMessage,
    rootDirectory: __dirname
};