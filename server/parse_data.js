var func1 = 'FX_DAILY';
var from_symbol = 'USD';
var to_symbol = 'JPY';
var apikey = '4ZHSS420ZVOBWM4I';

var date_array = [];
var close_values = [];

module.exports = function parse_data(data, ticker) {
  console.log(data);
  let values = data['Time Series FX (Daily)'];
  for (var date in values) {
    if (date_array[ticker] && date_array[ticker].length === 30) {
      break;
    }
    date_array[ticker].unshift(date);
    close_values[ticker].unshift(parseFloat(values[date]["3. low"]));
  }
  var parsedData = {};
  parsedData[ticker] = {
    date_array: date_array[ticker],
    close_values: close_values[ticker]
  }
  return parsedData;
}
