const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

var update = require('./update');
var parse_data = require('./parse_data');

var apikey = '4ZHSS420ZVOBWM4I';

class api {
  constructor(url, ticker) {
    this.url = url;
    this.ticker = ticker;
  }
}

USDJPY = new api(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=JPY&interval=1min&apikey=${apikey}`, 'USDJPY');
EURJPY = new api(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=JPY&interval=1min&apikey=${apikey}`, 'EURJPY');
GBPJPY = new api(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=GBP&to_symbol=JPY&interval=1min&apikey=${apikey}`, 'GBPJPY');
Dow = new api(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=DOW&apikey=${apikey}`, 'Dow');
Nikkei = new api(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NTETF&apikey=${apikey}`, 'Nikkei');
Shanghai = new api(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SGHIF&apikey=${apikey}`, 'Shanghai');
Nomura = new api(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NMR&apikey=${apikey}`, 'Nomura');

api_list = [[`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=JPY&interval=1min&apikey=${apikey}`, 'USDJPY'],
            [`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=JPY&interval=1min&apikey=${apikey}`, 'EURJPY']];

app = express();
app.use(cors());

var completedData = {};

app.get('/chart1', (req, res) => {
  for (let i in api_list) {
    let item = api_list[i];
    fetch(item[0])
       .then(results => { return results.json() })
       .then(data => {
         let parsedData = parse_data(data, item[1]);
         console.log(parsedData);
         Object.assign(completedData, parsedData);
       })
       .then(() => update(date_array, close_values))
       .catch(err => {
         console.log(err);
       });
  }
  res.send(completedData);
});

// app.get('/chart2', (req, res) => {
//   fetch(URLChart2)
//      .then(res => res.json())
//      .then(data => {
//         res.send(data);
//      })
//      .catch(err => {
//         res.redirect('/error');
//      });
// });

var port = 12321;

app.listen(port, (err) => {
  if (err) { console.log(err); }
  console.log(`Listening on port ${port}`);
});
