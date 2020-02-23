import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

var func = 'FX_DAILY';
var from_symbol = 'USD';
var to_symbol = 'JPY';
var apikey = '4ZHSS420ZVOBWM4I';

// var URL = `https://www.alphavantage.co/query?function=${func}&from_symbol=${from_symbol}&to_symbol=${to_symbol}&interval=1min&apikey=${apikey}`;
var URL = 'http://localhost:12321/chart1'

class Chart1 extends Component {
  constructor() {
    super();
    this.state = {
      close_prices: []
    };
  }

  componentDidMount() {
    fetch(URL)
    .then(results => {
      return results.json();
    }).then(data => {
      for (let item in data) {
        console.log(item, data[item]);
      }
      this.setState({
        close_prices: [data['USDJPY'], data['EURJPY']]
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
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'USDJPY',
                type: 'line',
                data: this.state.close_prices[0]
              },
              {
                name: 'EURJPY',
                type: 'line',
                data: this.state.close_prices[1]
              }
            ]
          }}
        />
      </div>
      );
  }
}

export default Chart1;
