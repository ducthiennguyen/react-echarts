import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

var func = 'TIME_SERIES_DAILY';
var symbol = 'MSFT';
var apikey = '4ZHSS420ZVOBWM4I';

// var URL = `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&apikey=${apikey}`
var URL = 'http://localhost:12321/chart2'
var date_array = [];
var close_values = [];

class Chart2 extends Component {
  constructor() {
    super();
    this.state = {
      date_array: [],
      close_values: []
    };
  }

  componentDidMount() {
    fetch(URL)
    .then(results => {
      return results.json();
    }).then(data => {
      let values = data['Time Series (Daily)'];
      for (var date in values) {
        date_array.unshift(date);
        close_values.unshift(parseFloat(values[date]["3. low"]));
        if (date_array.length >= 30) {
          break;
        }
      }
      this.setState({
        date_array: date_array,
        close_values: close_values
      });
    })
  }

  render() {
    return (
      <ReactEcharts
        option={{
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
    );
  }
}

export default Chart2;
