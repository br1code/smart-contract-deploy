'use strict';

const Web3 = require('web3');
const HDWallerProvider = require('truffle-hdwallet-provider');
const deployer = require('./src/deployer');

const config = require('./config');

const provider = new HDWallerProvider(config.transaction.phrase, config.transaction.network);
const web3 = new Web3(provider);

deployer.Deploy(web3, config);