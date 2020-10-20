import React, { Component } from 'react';
import './Table.scss';
import numeral from 'numeral';

class Table extends Component {
  constructor(props) {
    super(props);
    this.formatRate = this.formatRate.bind(this);
    this.formatNumber = this.formatNumber.bind(this);
    this.conformData = this.conformData.bind(this);
  }

  formatNumber(input) {
    return numeral(input).format('0,0.0a');
  }

  formatRate(input) {
    // handle very big and very small numbers
    if (input < 1) {
      return numeral(input).format('0.0[000000]');
    }
    return numeral(input).format('(0,0.00 a)');
  }

  conformData(input) {
    // turns data into : [{index:"AAA-BBB", AAA:{}, BBB:{} }]
    return input.length > 0
      ? input.reduce(function (rv, x) {
        rv = Array.isArray(rv) ? rv : []; // force start value as Array
        const alphaGrp = [x.from, x.to].sort().join('-');
        const row = rv.filter((c) => c.index === alphaGrp);
        row.length === 1
          ? (row[0][x.from] = x) // use from value as reference
          : rv.push({ index: alphaGrp, [x.from]: x }); // initial value
        return rv;
      }, {})
      : [];
  }

  renderRow(row) {
    // used to render each row
    const indices = row.index.split('-');
    return (
      <div key={row.index} className="tableRow">
        <div>{this.formatNumber(row[indices[1]].max)}</div>
        <div>{this.formatNumber(row[indices[1]].min)}</div>
        <div>{this.formatRate(row[indices[1]].rate)}</div>
        <div className="tableColMid">{row.index}</div>
        <div>{this.formatRate(row[indices[0]].rate)}</div>
        <div>{this.formatNumber(row[indices[0]].min)}</div>
        <div>{this.formatNumber(row[indices[0]].max)}</div>
      </div>
    );
  }

  render() {
    const groups = this.props.data ? this.conformData(this.props.data) : [];
    return (
      <div className="tableWrapper">
        <div className="tableRow tableHeader">
          <div>max</div>
          <div>min</div>
          <div>rate</div>
          <div>&larr;&nbsp;currency&nbsp;&rarr;</div>
          <div>rate</div>
          <div>min</div>
          <div>max</div>
        </div>
        {groups && groups.map((row) => this.renderRow(row))}
      </div>
    );
  }
}

export default Table;
