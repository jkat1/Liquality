import React, { PureComponent } from 'react';
import './DataTimer.scss';

class DataTimer extends PureComponent {
  constructor(props) {
    super(props);
    this.setupTimer = this.setupTimer.bind(this);
    this.time = this.time.bind(this);
    this.state = {
      // local state only for managing loading
      fetching: false, // for showing download status
      percent: 0,
      lastTime: new Date().getTime(), // last downloaded timestamp for comparison
    };
    this.setupTimer();
  }

  componentDidMount() {
    // fetch at start
    this.getNewData();
  }

  componentWillUnmount() {
    // cleanly exit
    this.setState({ fetching: true });
    clearInterval(this.props.timerRef.current);
  }

  setupTimer() {
    // here we trick react into using a single timer
    if (this.props.timerRef) {
      if (this.props.timerRef.current) {
        clearInterval(this.props.timerRef.current);
      }
      this.props.timerRef.current = setInterval(this.time, 500);
    }
  }

  getNewData() {
    // get new data
    this.setState({ borderColor: 'Fetching' }); // show loading in progress
    fetch(this.props.dataUrl)
      .then((response) => response.json())
      .then((data) => {
        this.props.setData(data); // send data up to populate the table
        this.setState({
          fetching: false,
          lastTime: new Date().getTime(), // count from this point in time
        });
      });
  }

  time() {
    // update display and init download as needed
    const delta = new Date().getTime() - this.state.lastTime;
    const newState = {};
    if (delta > this.props.updateInterval * 1000) {
      if (this.state.fetching === false) {
        newState.fetching = true;
        this.getNewData();
      }
    } else {
      newState.percent = delta / (this.props.updateInterval * 1000);
      if (newState.percent > 0.75) {
        newState.borderColor = 'End';
      } else if (newState.percent > 0.5) {
        newState.borderColor = 'Middle';
      } else {
        newState.borderColor = 'Start';
      }
    }
    this.setState(newState);
  }

  render() {
    return (
      // for dynamic width need to use style attribute
      <>
        {this.props.children}
        <div
          className={`timerBar timer${this.state.borderColor}`}
          style={{
            width: this.state.fetching
              ? window.innerWidth
              : this.state.percent * window.innerWidth,
          }}
        />
      </>
    );
  }
}

export default DataTimer;
