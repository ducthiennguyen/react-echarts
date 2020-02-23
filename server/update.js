const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017/react-echarts";

module.exports = async function update(data, ticker) {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => { console.log(err); });

  const dbo = client.db('react-echarts');
  let collection = dbo.collection(ticker);
  for (let i = 0; i < data.length; i++) {
    let date = data[i][0];
    let close_price = data[i][1];
    let updated = await collection.updateOne(
      { _id: i },
      { $set: {date: date, close_price: close_price} },
      { upsert: true }
    )
    console.log(ticker, updated.modifiedCount, updated.upsertedId);
  }
  client.close();
}
