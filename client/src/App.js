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
    // try {
    //   // Get network provider and web3 instance.
    //   const web3 = await getWeb3();

    //   // Use web3 to get the user's accounts.
    //   const accounts = await web3.eth.getAccounts();
      
    //   const account = accounts[0];

    //   // Set web3, accounts, and contract to the state, and then proceed with an
    //   // example of interacting with the contract's methods.
    //   this.setState({web3, accounts, account});

    // } catch (error) {
    //   // Catch any errors for any of the above operations.
    //   alert(
    //     `Failed to load web3, accounts, or contract. Check console for details.`,
    //   );
    //   console.error(error);
    // }

    // // We get the accounts exposed from metamask with ethers.js
    // const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner()

    // this.setState({
    //   signer
    // })

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
    ///Our Transcation function will go here!
  }
    

  render() {
    // if (!this.state.account) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
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
                {/* {this.state.queriedBalance} */}
              </div>
            </div>
          </div>
          <div className="column">
            <div className="profile">
              <br />
              <h5> Total Supply </h5>
              {/* <div id="totalSupplyBanner" className="banner">
              </div> */}
            </div>
          </div>
          <div className="column">
            <div className="totalSupply">
              <br />
              <h5> Wallet Balance </h5>
              <div id="profileBalanceBanner" className="banner">
                {/* {this.state.balance} */}
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
