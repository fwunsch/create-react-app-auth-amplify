import React from 'react'

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
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
                <h1>This is a ticking clock</h1>
                <h2>Current time is {this.state.date.toLocaleDateString()} or simply {this.state.date.getTime()}.</h2>
            </div>
        )
    }
}

export default Clock;
