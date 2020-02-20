import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

var func = 'FX_DAILY';
var from_symbol = 'USD';
var to_symbol = 'JPY';
var apikey = '4ZHSS420ZVOBWM4I';

// var URL = `https://www.alphavantage.co/query?function=${func}&from_symbol=${from_symbol}&to_symbol=${to_symbol}&interval=1min&apikey=${apikey}`;
var URL = 'http://localhost:12321/chart1'

var ticker_array = [];
var date_array = [];
var close_values = [];

class Chart1 extends Component {
  constructor() {
    super();
    this.state = {
      ticker_array: [],
      date_array: [],
      close_values: []
    };
  }

  componentDidMount() {
    fetch(URL)
    .then(results => {
      return results.json();
    }).then(data => {
      for (let item in data) {
        console.log(item);
      }
      this.setState({
        date_array: data.date_array,
        close_values: data.close_values
      });
    })
  }

  render() {
    return (
      <div>
        <ReactEcharts
          option={{
            tooltip: {
              trigger: 'item'
            },
            xAxis: {
              type: 'category',
              data: this.state.date_array
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              type: 'line',
              data: this.state.close_values
            }]
          }}
        />
      </div>
      );
  }
}

export default Chart1;
