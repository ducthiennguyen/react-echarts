const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://thien:ndt12321@graphqlstart-70zq3.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var func = 'FX_DAILY';
var from_symbol = 'USD';
var to_symbol = 'JPY';
var apikey = '4ZHSS420ZVOBWM4I';

var URL = `https://www.alphavantage.co/query?function=${func}&from_symbol=${from_symbol}&to_symbol=${to_symbol}&interval=1min&apikey=${apikey}`;

app = express();
app.use(cors());

app.get('/', (req, res) => {
  // client.connect(err => {
  //   const dbo = client.db("test");
  //   // perform actions on the collection object
  //   dbo.collection('books').find({}).toArray((err, books) => {
  //     if(err) throw err;
  //     res.send(books);
  //     console.log(books);
  //   });
  // });
  // client.close();

  fetch(URL)
     .then(res => res.json())
     .then(data => {
        res.send(data);
     })
     .catch(err => {
        res.redirect('/error');
     });
});

var port = 12321;

app.listen(port, (err) => {
  if (err) { console.log(err); }
  console.log(`Listening on port ${port}`);
});
