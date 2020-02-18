const express = require('express');
const path = require('path');

const app = express();

app.get('/api', (req, res) => {
  res.send({
    title: 'hello',
    data: 'world',
    help: 'test',
  });
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(4000);