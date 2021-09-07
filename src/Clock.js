import React from 'react'
import DeviceMotion from 'react-device-motion';


class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            accel: {'x': 0, 'y': 0, 'z': 0}
        };
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

    render() {
        return (
            <div>
                <div>
                <h1>This is a ticking clock</h1>
                <h2>Current time is {this.state.date.toLocaleDateString()} or simply {this.state.date.getTime()}.</h2>
                </div>
                <div>
                    <h1>This is 3D acceleration: {JSON.stringify(this.state.accel)} m/s</h1>
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
            </div>
        )
    }
}

export default Clock;
