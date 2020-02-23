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

USDJPY = new api(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=JPY&apikey=${apikey}`, 'USDJPY');
EURJPY = new api(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=JPY&apikey=${apikey}`, 'EURJPY');
GBPJPY = new api(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=GBP&to_symbol=JPY&apikey=${apikey}`, 'GBPJPY');
Dow = new api(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=DOW&apikey=${apikey}`, 'Dow');
Nikkei = new api(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NTETF&apikey=${apikey}`, 'Nikkei');
Shanghai = new api(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SGHIF&apikey=${apikey}`, 'Shanghai');
Nomura = new api(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NMR&apikey=${apikey}`, 'Nomura');

api_list = [[`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=JPY&apikey=${apikey}`, 'USDJPY'],
            [`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=JPY&apikey=${apikey}`, 'EURJPY']];

app = express();
app.use(cors());

async function fetchURLs() {
  try {
    var data = await Promise.all([
      fetch(USDJPY.url).then(results => results.json()),
      fetch(EURJPY.url).then(results => results.json())
    ]);

    var currencyData = {};

    currencyData['USDJPY'] = parse_data(data[0]);
    currencyData['EURJPY'] = parse_data(data[1]);
    // console.log(currencyData);

    app.get('/chart1', (req, res) => {
      res.send(currencyData);
    });

    return currencyData;
  } catch (err) {
    console.log(err);
  }
}

fetchURLs()
  .then(data => {
    console.log('Data: ', data);
    update(data['USDJPY'], 'USDJPY');
    update(data['EURJPY'], 'EURJPY');
  });

var port = 12321;

app.listen(port, (err) => {
  if (err) { console.log(err); }
  console.log(`Listening on port ${port}`);
});
