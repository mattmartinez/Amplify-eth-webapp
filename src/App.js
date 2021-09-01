import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import {AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'

Amplify.configure(awsconfig);

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockChainData();
  }

  async loadBlockChainData(){
    const web3 = await window.web3;
    const accounts = await web3.eth.getAccounts();
    const ethBalance = await web3.eth.getBalance(this.state.account);
    this.setState({ account: accounts[0] });
    this.setState({ ethBalance });
    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        } catch (error) {
          console.error(error);
        }
      }
      else {
        window.alert('non-ethereum brwoser detected, install metamask!');
      }
    }
    
    constructor(props) {
      super(props);
      this.state = {
        account: '',
        ethBalance: '',
        loading: true
      }
    }
    render(){
      return (  
        <div className="App">
          <header className="App-Header">
            < AmplifySignOut/>
            <h3>ETH Wallet</h3>
          { this.state.account}
            <h3>Balance</h3>
            {this.state.ethBalance} ETH
          </header>
        </div>
      )
    }
  }
export default withAuthenticator(App);
