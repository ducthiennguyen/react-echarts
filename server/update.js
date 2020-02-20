const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017/react-echarts";

module.exports = async function update(date_array, close_values) {
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
    // console.log(updated.modifiedCount, updated.upsertedId);
  }
  client.close();
}
