import React from 'react'

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            isRunning: false,
            accel: {'x': 0, 'y': 0, 'z': 0},
            accelInterval: -1,
            eventCount: 0
        };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.handleMotion = this.handleMotion.bind(this);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    handleMotion(event) {
        newEventCount = this.state.eventCount + 1;
        this.setState({accel: {'x': event.acceleration.x, 
                            'y': event.acceleration.y, 
                            'z': event.acceleration.z},
                        accelInterval: event.interval,
                        eventCount: newEventCount
                        });

      }

    handleClick() {

        // Request permission for iOS 13+ devices
        if (
            DeviceMotionEvent &&
            typeof DeviceMotionEvent.requestPermission === "function"
        ) {
            DeviceMotionEvent.requestPermission();
        }
        
        if (this.state.isRunning){
            window.removeEventListener("devicemotion", handleMotion);
            this.setState({isRunning: false, accelInterval: -1});
        }else{
            window.addEventListener("devicemotion", handleMotion);
            this.setState({isRunning: true, eventCount: 0});
        }

        
    }

    render() {
        return (
            <div>
            <h1>This is an acceleration sensor reader</h1>
            <h2>Current event count is {this.state.eventCount} with event interval {this.state.accelInterval} ms. -1 means stopped.</h2>
            <button onClick={this.handleClick}>
                {this.state.isRunning ? 'ON' : 'OFF'}
            </button>
            </div>
        )
    }
}

export default Clock;
