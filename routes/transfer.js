var express = require('express'); // Express
var router = express.Router(); // Creating express route
const ethers = require('ethers'); // Requiring Ethers, which is a very useful library that allows us to call Smart Contract Functions from the Backend
const CONTRACT_ADDRESS = '0xc82c3621ad032bCB46F433C38FF74C7EaA0ec960' ; // insert your contract address from Ganache
const CONTRACT_ABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_symbol",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_coinSupply",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
]; // insert the ABI for your smart contract from Ganache

// The variable "URL" will be where your server is being hosted, if you are testing locally on Ganache then go to your workspace 
// in Ganache and copy and paste the RPC Server. It will look something like this: "HTTP://127.0.0.1:7545".
// We are testing our DApp locally so we need to set "URL" to the RPC Server on Ganache.
let URL = "HTTP://127.0.0.1:7545";

// Further information can be provided on the ethers.js documentation found at this link: https://docs.ethers.io/ethers.js/html/index.html

// Yet again, we are hosting this locally so we will create a Provider on Ethers.js (Ethers.js > Web3.js!)
// You can use any provider you want here is a short 
// list of a few popular providers off the top of my head:
// .getDefaultProvider([network = "ANY ETHEREUM TEST NETWORK"]) ~ use .getDefaultProvider() if you ARE NOT locally hosting an Ethereum Node
// .EtherscanProvider([network = "ANY ETHEREUM TEST NETWORK"] or [API_TOKEN]) ~ use .EtherscanProvider if you are using Etherscan's blockchain web API
// .InfuraProvider([network = "ANY ETHEREUM TEST NETWORK"] or [API_ACCESS_TOKEN]) ~ use .InfuraProvider if you connect to INFURA's network of Ethereum Nodes
// .JsonRpcProvider([URL = "LOCALLY HOSTED RPC SERVER"] or [NETWORK]) ~ use .JsonRpcProvider if you ARE locally hosting an Ethereum Node or if you want to connect to a test network such as "ropsten"
// .Web3Provider(web3Provider or [network]) ~ Similar to JsonRpcProvider
// .FallbackProvider(providers) ~ Inherits from Provider it's a fallback to other providers
// .IpcProvider(path or [network]) ~ Connected to the JsonRpcProvider over IPC (or pipes) to an Ethereum Node, like Geth or Parity

let customHttpProvider = new ethers.providers.JsonRpcProvider(URL); // We are hosting locally so the best suited method is .JsonRpcProvider and we pass the RPC Server stated before

// router.post('/transfer', async function(req, res, next) { // creating a post request to the '/transfer' endpoint blahy
//    //let wallet = new ethers.Wallet(req.body.wallet)
//     let transferContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, req.body.wallet);
//     let contractTransfer = await transferContract.transfer(req.body.receiver, req.body.amount)
    
//     res.send(contractTransfer);
// });

let Contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, customHttpProvider.getSigner(0)); // three parameters (CONTRACT_ADDRESS, CONTRACT_ABI, customHttpProvider.getSigner(0));

router.post('/getBalance', async function (req, res, next) { // Creating a post request to the '/getBalance' endpoint where we call the Smart Contract Methods
  // The only key in the request we receive will be a wallet, which will contain the address of the user
  const BALANCE = await Contract.getBalance( req.body.wallet ); // Calling the smart contract function and passing in the wallet we want to retrieve the balance of
  let RESPONSE_MESSAGE = (`${BALANCE}`); // Creating a message to send back to the frontend
  res.send(RESPONSE_MESSAGE); // Sending a response that contains the "RESPONSE_MESSAGE"
});

router.get('/totalsupply', async function (req, res, next) { // Creating a get request to the '/totalsupply' endpoint
	let totalSupply = await Contract.totalSupply();
    res.send(`${totalSupply}`);
}); 

module.exports = router;