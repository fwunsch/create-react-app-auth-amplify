import React from 'react'
import Plot from 'react-plotly.js';


class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            isRunning: false,
            accelInterval: -1,
            eventCount: 0,
            Tarr: [],
            Xarr: [],
            Yarr: [],
            Zarr: []
        };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.handleMotion = this.handleMotion.bind(this);
    }

    handleMotion(event) {
        this.setState(prevState => ({
            accelInterval: event.interval,
            eventCount: prevState.eventCount + 1,
            Tarr: [...prevState.Tarr, Date.now()],
            Xarr: [...prevState.Xarr, event.acceleration.x],
            Yarr: [...prevState.Yarr, event.acceleration.y],
            Zarr: [...prevState.Zarr, event.acceleration.z]
        }));

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
            window.removeEventListener("devicemotion", this.handleMotion);
            this.setState({isRunning: false, accelInterval: -1});
        }else{
            window.addEventListener("devicemotion", this.handleMotion);
            this.setState({isRunning: true, eventCount: 0, Xarr: [], Yarr: [], Zarr: []});
        }

        
    }

    render() {
        let accplotjsx = (<p>Press stop to plot the recording.</p>);
        let posplotjsx = null;
        if (!this.state.isRunning && this.state.Xarr.length > 0) {
            let tarrzero = this.state.Tarr - this.state.Tarr[0];
            accplotjsx = (<Plot
            data={[
            {
                x: tarrzero,
                y: this.state.Xarr,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'},
                name: 'X'
            },
            {
                x: tarrzero,
                y: this.state.Yarr,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'blue'},
                name: 'Y'
            },
            {
                x: tarrzero,
                y: this.state.Zarr,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'green'},
                name: 'Z'
            }
            ]}
            layout={ {height: window.innerWidth, width: window.innerWidth, title: 'Acceleration values'} }
            />);

            var tInc = [];
            for(let i=0; i<this.state.Tarr.length-1; i++){
                tInc.push(0.001 * (this.state.Tarr[i+1] - this.state.Tarr[i]));
            }
            var posX = [0];
            var posY = [0];
            var posZ = [0];
            for (let i=0; i<tInc.length; i++){
                posX.push(posX.at(-1) + this.state.Xarr[i] * tInc[i]);
                posY.push(posY.at(-1) + this.state.Yarr[i] * tInc[i]);
                posZ.push(posZ.at(-1) + this.state.Zarr[i]) * tInc[i];
            }
            posplotjsx = (<Plot
                data={[
                {
                    x: tarrzero,
                    y: posX,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                    name: 'X'
                },
                {
                    x: tarrzero,
                    y: posY,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'blue'},
                    name: 'Y'
                },
                {
                    x: tarrzero,
                    y: posZ,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'green'},
                    name: 'Z'
                }
                ]}
                layout={ {height: window.innerWidth, width: window.innerWidth, title: 'Position'} }
                />);
        }
        return (
            <div>
            <h1>This is an acceleration sensor reader</h1>
            <h2>Current event count is {this.state.eventCount} with event interval {this.state.accelInterval} ms. -1 means stopped.</h2>
            <button onClick={this.handleClick}>
                {this.state.isRunning ? 'ON' : 'OFF'}
            </button>
            {accplotjsx}
            {posplotjsx}
            </div>
        )
    }
}

export default Clock;
