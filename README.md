# Smart Contract Deploy

## Requirements
- [Node.js](https://nodejs.org)
- One ethereum account with some amount of ether - [MetaMask](https://metamask.io)
- [Windows Build Tools](https://www.npmjs.com/package/windows-build-tools)
  
## Steps to compile and deploy
- Download and install Node.js
- Install Windows build tools running (open your command prompt as **Administrator**)
    ```
    npm install --global --production windows-build-tools
    ```
- Clone this repository running
    ```
    git clone https://github.com/br1code/smart-contract-deploy.git
    ```
- Inside the smart-contract-folder, install the dependencies running
    ```
    npm install
    ```
- Write and save your contract file (.sol) in **/contracts**. Example: 
    ```javascript
        pragma solidity ^0.5.0;

        contract Inbox {
            string public message;

            constructor(string memory initialMessage) public {
                message = initialMessage;
            }

            function setMessage(string memory newMessage) public {
                message = newMessage;
            }
        }
    ```
- Edit the **config.js** file placed in the root directory
    ```javascript
    module.exports = {
        contract: {
            name: 'Inbox',
            fileName: 'Inbox.sol',
            arguments: ['hello there!']
        },
        transaction: {
            gas: '',
            address: '',
            network: '',
            phrase: ''
        }
    };
    ```
- Finally run:
    ```
    npm run start
    ```