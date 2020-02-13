import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

// alphavantage API: 4ZHSS420ZVOBWM4I

var func = 'FX_DAILY';
var from_symbol = 'USD';
var to_symbol = 'JPY';
var interval = '1min';
const apikey = '4ZHSS420ZVOBWM4I';
// var URL = `https://www.alphavantage.co/query?function=${func}&from_symbol=${from_symbol}&to_symbol=${to_symbol}&apikey=${apikey}`;
var URL = `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${from_symbol}&to_symbol=${to_symbol}&interval=1min&apikey=${apikey}`;
// var URL = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=MSFT&apikey=${apikey}`
var date_array = [];
var close_values = [];
console.log(URL);
class App extends Component {
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
      let values = data['Time Series FX (1min)'];
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
    console.log(date_array);
    console.log(close_values.length);
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

export default App;
