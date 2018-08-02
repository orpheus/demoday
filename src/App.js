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

        this.login = this.login.bind(this)
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
            .catch(() => {
                account.login()
                    .then(succ => {
                        this.setState({
                            account: account,
                            account_info: succ,
                            wallet: account.wallet
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
    }

    login() {
        let a = this.state.account;
        let m = this.state.wallet.getMnemonic();
        a ? a.login(m).then( success => {
            this.setState({
                isLoggedIn: true,
                loginDetails: success
            })
        }).catch(err => {
            this.setState({
                isLoggedIn: false,
                loginError: true,
                loginErrorMessage: err
            })
        }) : null
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
          <div className="row m-3 d-flex justify-content-center">
              <button onClick={this.login} className="btn btn-large btn-success">Login, yeah!</button>
          </div>
          <div className="row m-3 d-flex justify-content-center">
              {this.state.isLoggedIn ? <h4>Yew! We just logged into an account with a full functioning wallet using just 12 words!</h4> :
                  this.state.loginError ? <h4>I blame someone else</h4> : "waiting for you to click the login button!" }
          </div>
      </div>
    );
  }
}

export default App;
