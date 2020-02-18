import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

var func = 'FX_DAILY';
var from_symbol = 'USD';
var to_symbol = 'JPY';
var apikey = '4ZHSS420ZVOBWM4I';

// var URL = `https://www.alphavantage.co/query?function=${func}&from_symbol=${from_symbol}&to_symbol=${to_symbol}&interval=1min&apikey=${apikey}`;
var URL = 'http://localhost:12321/chart1'

var date_array = [];
var close_values = [];

class Chart1 extends Component {
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
      console.log(data);
      let values = data['Time Series FX (Daily)'];
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
      <div>
        <ReactEcharts
          option={{
<<<<<<< HEAD
            tooltip: {
              trigger: 'item'
            },
=======
>>>>>>> cc26074fbbec7f6b4d1459f99153ec0a73c7cbdf
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
