import React, { Component } from 'react';
import Clock from './Clock.js'
import ReactAccelerometer from 'react-accelerometer'


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
        <div><Clock/></div>
        <ReactAccelerometer>
        {(position, rotation) => (
          <ul>
            <li>x: {position.x}</li>
            <li>y: {position.y}</li>
            <li>z: {position.z}</li>
            <li>rotation alpha: {rotation.alpha}</li>
            <li>rotation beta: {rotation.beta}</li>
            <li>rotation gamma: {rotation.gamma}</li>
          </ul>
        )}
      </ReactAccelerometer>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
