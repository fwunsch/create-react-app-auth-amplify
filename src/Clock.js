import React from 'react'

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            accel: 0
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
                    <h1>This is 3D acceleration: {this.state.accel} m/s</h1>
                </div>
            </div>
        )
    }
}

export default Clock;
