const express = require('express');
const cors = require('cors');
const app = express();
const port = 12321;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

require('./routes')(app);

app.listen(port, (err) => {
  if (err) { console.log(err); }
  console.log(`Listening on port ${port}`);
});
