import React from 'react'
import DeviceMotion from 'react-device-motion';


class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            isRunning: false,
            accel: {'x': 0, 'y': 0, 'z': 0}
        };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    handleClick() {
        this.setState(prevState => ({
          isRunning: !prevState.isRunning
        }));
    }

    render() {
        return (
            <div>
            <h1>This is a ticking clock</h1>
            <h2>Current time is {this.state.date.toLocaleDateString()} or simply {this.state.date.getTime()}.</h2>
            <button onClick={this.handleClick}>
                {this.state.isRunning ? 'ON' : 'OFF'}
            </button>
            </div>
        )
    }
}

export default Clock;
