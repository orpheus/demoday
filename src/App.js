import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {Index} from 'oip-index';
import Account from 'oip-account'

class App extends Component {
    constructor() {
        super();

        this.state = {
            account: undefined,
            wallet: undefined,
            network: new Index()
        }
    }


    componentDidMount() {
        let account = new Account("ryan+demoday@alexandria.io", "password", {discover: false,
        store_in_keystore: true, keystore_url: "https://mk1.alexandria.io/keystore"})

        account.create()
            .then(account_data => {
                this.setState({
                    account,
                    account_info: account_data,
                    wallet: account.wallet
                })
            })
            .catch(err => {
                console.log("Account creation error: ", err)
            })
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the Open Index Protocol</h1>
        </header>
          <div className="row m-3 d-flex justify-content-center">
              <div className="mr-3"><b>My Mnemonic</b></div>
              <div className="">{!!this.state.wallet ? this.state.wallet.getMnemonic() : "Fetching mnemonic..."}</div>
          </div>
      </div>
    );
  }
}

export default App;
