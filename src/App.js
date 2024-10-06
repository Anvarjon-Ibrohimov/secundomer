import React, { Component } from "react";
import "./App.css";
import { hover } from "@testing-library/user-event/dist/hover";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secund: 0,
      minute: 0,
      hour: 0,
      disabled: false,
      interval: "",
      intervalStorage: [],
    };
  }
  start = () => {
    this.setState({
      disabled: true,
    });
    let time = setInterval(() => {
      if (this.state.minute === 59) {
        this.setState({
          secund: 0,
          minute: 0,
          hour: this.state.hour + 1,
        });
      } else {
        if (this.state.secund === 59) {
          this.setState({
            secund: 0,
            minute: this.state.minute + 1,
          });
        } else {
          this.setState({
            secund: this.state.secund + 1,
          });
        }
      }
    }, 10);
    this.setState({
      interval: time,
    });
  };
  stop = () => {
    clearInterval(this.state.interval);
    this.setState({
      disabled: false,
    });
  };
  clear = () => {
    this.setState({
      secund: 0,
      minute: 0,
      hour: 0,
      intervalStorage: [],
    });
  };
  interval = () => {
    this.state.intervalStorage.push(
      `${this.state.hour}:${this.state.minute}:${this.state.secund}`
    );
    this.setState({
      intervalStorage: this.state.intervalStorage,
    });
  };
  render() {
    const { secund, minute, hour, disabled, intervalStorage } = this.state;
    return (
      <div className="App">
        <div className="heading">
          <h2>Secundomer</h2>
        </div>
        <div className="timer">
          <p className="h4">
            {hour}:{minute}:{secund}
          </p>
        </div>
        <div className="btn btn-group">
          <button
            className="btn btn-success"
            onClick={this.start}
            disabled={disabled}>
            Start
          </button>
          <button className="btn btn-warning" onClick={this.stop}>
            Stop
          </button>
          <button className="btn btn-danger" onClick={this.clear}>
            Clear
          </button>
          <button className="btn btn-dark" onClick={this.interval}>
            Interval
          </button>
        </div>
        <div className="interval-storage">
          <hr />
          <h3>Intervals</h3>
          {intervalStorage.map((datatime, index) => {
            return (
              <h5 className="">
                {index + 1} - {datatime}
              </h5>
            );
          })}
        </div>
      </div>
    );
  }
}
