const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());

app.get('/api/polls', function(req, res) {
  res.send(JSON.parse(fs.readFileSync('./assets/data.json')));
});

app.get('/api/poll/:id', function(req, res) {
  const id = Number(req.params.id);
  const polls = JSON.parse(fs.readFileSync('./assets/data.json'));
  res.send(polls.find(poll => poll.id === id));
});

app.put('/api/poll/:id', function(req, res) {
  const id = Number(req.params.id);
  if (req.body) {
    const data = req.body;
    const polls = JSON.parse(fs.readFileSync('./assets/data.json'));
    const newPolls = polls.map(poll => {
      if (poll.id === id) {
        return data;
      }
      return poll;
    });
    fs.writeFileSync('./assets/data.json', JSON.stringify(newPolls));
    res.send({
      message: 'Data Saved',
    });
  } else {
    res.status(400).send({
      message: 'Error No Data',
    });
  }
});

// Serving the unknown routes to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
