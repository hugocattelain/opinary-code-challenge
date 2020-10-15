const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const pollData = require('./data.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/poll', function(req, res) {
  res.send(JSON.parse(fs.readFileSync('data.json')));
});

app.post('/poll', function(req, res) {
  if (req.body) {
    fs.writeFileSync('data.json', JSON.stringify(req.body));
    res.send({
      message: 'Data Saved',
    });
  } else {
    res.status(400).send({
      message: 'Error No Data',
    });
  }
});

app.listen(5000, () => console.log('Server Running...'));
