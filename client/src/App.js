import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import { ethers } from 'ethers';

import "./App.css";

class App extends Component {

  constructor() {
    super();
    this.state = {
      storageValue: 0,
      web3: null,
      accounts: null,
      contract: null,
      account: null,
      address: null,
      amount: 0,
      balance: null,
      signer: null,
      queriedBalance: null
    }
    this.submit = this.submit.bind(this);
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      
      const account = accounts[0];

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({web3, accounts, account});

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

    // We get the accounts exposed from metamask with ethers.js
    const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner()

    this.setState({
      signer
    })

    // COMMENT SO KIDS CAN UNDERSTNAD
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"wallet": this.state.account});
    
    var requestOptionsBalance = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:3005/api/getBalance", requestOptionsBalance)
      .then(response => response.text())
      .then(result => {
        this.setState({
          balance: result
        })
      })
      .catch(error => console.log('error', error));
    // COMMENT SO KIDS CAN UNDERSTNAD

    var requestOptionsTotalSupply = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:3005/api/totalsupply", requestOptionsTotalSupply)
      .then(response => response.text())
      .then(result => {
        document.getElementById('totalSupplyBanner').innerHTML = `
        ${result}
        `
      })
      .catch(error => console.log('error', error));

    // profileBalanceBanner
    // totalSupplyBanner

  };

  handleAddress = (e) => {
    e.preventDefault();
    this.setState({
      address: e.target.value
    })
  }

  handleAmount = (e) => {
    e.preventDefault();
    this.setState({
      amount: e.target.value
    })
  }

  handleSearchAddress = (e) => {
    e.preventDefault();
    this.setState({
      searchAddress: e.target.value
    })
  }

  searchSubmit = (e) => {
    e.preventDefault();

    var raw = JSON.stringify({"wallet": this.state.searchAddress});
    
    // COMMENT SO KIDS CAN UNDERSTNAD
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"wallet": this.state.searchAddress});
    
    var requestOptionsBalance = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:3005/api/getBalance", requestOptionsBalance)
      .then(response => response.text())
      .then(result => {
        this.setState({
          queriedBalance: result
        })
      })
      .catch(error => console.log('error', error));

    document.getElementById('account-search').reset();
        
  }

  submit = async (e) => {
    e.preventDefault();
    if (true) {
    //if (document.getElementById('address').value == '' || document.getElementById('amount').value =='') {

      const CONTRACT_ADDRESS = '0xc82c3621ad032bCB46F433C38FF74C7EaA0ec960'; 
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
    ];
    
      let URL = 'HTTP://127.0.0.1:7545';

      let transferContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.state.signer);
      let contractTransfer = await transferContract.transfer(this.state.address, this.state.amount)

      // clearing form
      document.getElementById('address').value = '';
      document.getElementById('amount').value = '';

      var raw = JSON.stringify({"wallet": this.state.searchAddress});
      
      // COMMENT SO KIDS CAN UNDERSTNAD
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptionsBalance = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
    
      fetch("http://localhost:3005/api/getBalance", requestOptionsBalance)
        .then(response => response.text())
        .then(result => {
          this.setState({
            queriedBalance: result
          });
        })
        .catch(error => console.log('error', error));
      
      window.location.reload();

      }


  }

  render() {
    if (!this.state.account) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">

        <div className="row">
          <div className="column">    
            <div className="transferAddress">
              <br />
              <h5> Tokens Transfer </h5>
              <form>
                <label className="labelTitle" htmlFor="address"> Address: </label> <br/> <br/> <br/>
                <input onChange={this.handleAddress} type="text" id="address" required /> 
                <br/> <br/> <br/>

                <label htmlFor="amount"> Amount: </label> <br/> <br/> <br/>
                <input onChange={this.handleAmount} type="text" id="amount" required /> 
                <br/> <br/> <br/>
                <button onClick={this.submit} > TRANSFER </button>
              </form>
            </div>
          </div>
          <div className="column">
            <div className="queryBalance">
              <br />
              <h5> Account Search </h5>
              <form id="account-search" >
                <label htmlFor="searchAddress"> Address: </label> <br/> <br/> <br/>
                <input onChange={this.handleSearchAddress} type="text" id="searchAddress" required />
                <br/> <br/> <br/>

                <button onClick={this.searchSubmit} > SEARCH </button>
              </form>
              <div id="queryBalanceBanner" className="banner">
                {this.state.queriedBalance}
              </div>
            </div>
          </div>
          <div className="column">
            <div className="profile">
              <br />
              <h5> Total Supply </h5>
              <div id="totalSupplyBanner" className="banner">
                asda
              </div>
            </div>
          </div>
          <div className="column">
            <div className="totalSupply">
              <br />
              <h5> Wallet Balance </h5>
              <div id="profileBalanceBanner" className="banner">
                {this.state.balance}
              </div>
            </div>
          </div>
          <div className="column">
            <div className="application">
              <br />
              <h4> Hack The Earth 2020 </h4>
              <h3> Ethereum Network Workshop </h3>
              <h2> Full Stack Development and explanation of this demo was done by Aditya Keerthi and Markos Georghiades </h2>
              <a target="_blank" href="mailto: aditya261414@gmail.com" > aditya261414@gmail.com  </a> <br />
              <a target="_blank" href="mailto: markosgwork@gmail.com" > markosgwork@gmail.com  </a> <br />
              <a target="_blank" href="https://www.linkedin.com/in/aditya-keerthi-b93726197/" > /in/aditya-keerthi-b93726197/ </a> <br />
              <a target="_blank" href="https://www.linkedin.com/in/markos-the-student/" > /in/markos-the-student/ </a> <br />
            </div>
          </div>
    
        </div> 



      </div>
    );
  }
}

export default App;
