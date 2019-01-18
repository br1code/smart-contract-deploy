'use strict';

function exitWithMessage(message) {
    console.error(message);
    process.exit();
}

function isString(value) {
    return typeof value === "string";
}


module.exports = { 
    exitWithMessage, 
    isString,
    rootDirectory: __dirname
};