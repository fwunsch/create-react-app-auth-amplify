import React, { Component } from 'react';
import Clock from './Clock.js'

import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);


class App extends Component {
  render() {
    return (
      <div>
        <Clock/>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
