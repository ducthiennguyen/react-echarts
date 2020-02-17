const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://thien:ndt12321@graphqlstart-70zq3.mongodb.net/test?retryWrites=true&w=majority";
const url = "mongodb://127.0.0.1:27017/";

var func1 = 'FX_DAILY';
var func2 = 'TIME_SERIES_DAILY';
var from_symbol = 'USD';
var to_symbol = 'JPY';
var symbol = 'MSFT';
var apikey = '4ZHSS420ZVOBWM4I';

var URLChart1 = `https://www.alphavantage.co/query?function=${func1}&from_symbol=${from_symbol}&to_symbol=${to_symbol}&interval=1min&apikey=${apikey}`;
var URLChart2 = `https://www.alphavantage.co/query?function=${func2}&symbol=${symbol}&apikey=${apikey}`

var date_array = [];
var close_values = [];

app = express();
app.use(cors());

async function async_update() {
  console.log('async_update function starts at ', new Date());
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => { console.log(err); });

  const dbo = client.db('react-echarts');
  let collection = dbo.collection('chart1');
  for (let i = 0; i < 30; i++) {
    let date = date_array[i];
    let close_val = close_values[i];
    let updated = await collection.updateOne(
      { _id: i },
      { $set: {date: date, close_val: close_val} },
      { upsert: true }
    )
    console.log(updated.modifiedCount, updated.upsertedId);
  }
  client.close();
}

app.get('/chart1', (req, res) => {

  fetch(URLChart1)
     .then(results => {
       console.log('results starts at ', new Date());
       return results.json();
     })
     .then(data => {
       console.log('fetch function starts at ', new Date());
       // console.log(data);
       let values = data['Time Series FX (Daily)'];
       for (var date in values) {
         date_array.unshift(date);
         close_values.unshift(parseFloat(values[date]["3. low"]));
         if (date_array.length >= 30) {
           break;
         }
       }
       console.log('fetch function stops at ', new Date());
     })
     .then(() => async_update())
     .catch(err => {
       console.log(err);
     });
  res.send('done');
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
