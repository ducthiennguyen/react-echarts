module.exports = function parse_data(data) {
  // console.log(data);
  var parsed = [];
  let values = data['Time Series FX (Daily)'];
  for (var date in values) {
    var today = new Date();
    if ((today - new Date(date)) / (1000 * 60 * 60 * 24) >= 30) {
      break;
    }
    parsed.unshift([date, parseFloat(values[date]['3. low'])]);
  }
  return parsed;
}
