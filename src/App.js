import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SendButton from './components/SendButton'
import IOTA from 'iota.lib.js'
import CURL from 'curl.lib.js'

class App extends Component {

  constructor(props) {
    super(props)

    // Create IOTA instance directly with provider
    var iota = new IOTA({
        'provider': 'https://nodes.devnet.thetangle.org:443'
    });
    
    // Attach curl to iota instance so that we can perform WebGL proof of work
    try {
        CURL.init();
        CURL.overrideAttachToTangle(iota);
    } catch (err) {
        console.error("Error", err);
    }

    this.state = {iota: iota}

    iota.api.getNodeInfo(function(error, success) {
        if (error) {
            console.error(error);
        } else {
            console.log(success);
        }
    });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <SendButton iota={this.state.iota}/>
      </div>
    );
  }
}

export default App;
