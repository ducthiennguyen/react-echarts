const fetch = require('node-fetch');

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

var api_list = [USDJPY, EURJPY];

var date_array = [];
var close_values = [];

module.exports = function process(api) {
  for (let item in api_list) {
    fetch(item.url)
       .then(results => { return results.json() })
       .then(data => {
         let parsedData = parse_data(data, item.ticker);
         // console.log(parsedData);
         date_array = parsedData.date_array;
         close_values = parsedData.close_values;
         res.send(parsedData);
       })
       .then(() => update(date_array, close_values))
       .catch(err => {
         console.log(err);
       });
  }
}
