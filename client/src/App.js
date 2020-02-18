import React, { Component } from 'react';

// alphavantage API: 4ZHSS420ZVOBWM4I

import Chart1 from './chart1.js';
import Chart2 from './chart2.js';

class App extends Component {

  render() {
    return (
      <div id = 'main'>
        <h1>Charts</h1>
        <Chart1 />
      </div>
    );
  }
}

export default App;
