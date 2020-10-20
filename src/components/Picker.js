import React, { Component } from 'react';
import './Picker.scss';

class Picker extends Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    // send up
    this.props.picked && this.props.picked(event.target.value);
  }

  render() {
    return (
      <div className="pickerWrapper">
        <div>update Interval : </div>
        <div className="picker">
          {[5, 10, 15].map((val) => (
            <span className="pickerItem" key={val}>
              <input
                id={`pick_${val}`}
                type="radio"
                value={val}
                name="interval"
                onChange={this.changeValue}
                checked={parseInt(this.props.updateInterval) === val}
              />
              <label htmlFor={`pick_${val}`}> {val}s</label>
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default Picker;
