import React, { Component } from 'react';
import Clock from './Clock.js'
import DeviceMotion from 'react-device-motion';


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
      <DeviceMotion>
        {({
          acceleration, accelerationIncludingGravity, interval, rotationRate
        }) => (
          <div>
            {`Acceleration: ${JSON.stringify(acceleration)}`}
            {`Acceleration including gravity: ${JSON.stringify(accelerationIncludingGravity)}`}
            {`Interval: ${interval}`}
          </div>
        )}
      </DeviceMotion>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
