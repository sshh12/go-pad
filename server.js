const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const host = process.env.WEB_HOST || '0.0.0.0';

const app = express();
app.use(bodyParser.json());

let localStore = {};

app.use('/', express.static(path.join(__dirname, 'www')));
app.post('/push/:key', (req, res) => {
  let { key } = req.params;
  localStore[key] = req.body;
  res.json({ done: true });
});
app.get('/pull/:key', (req, res) => {
  let { key } = req.params;
  res.json(localStore[key]);
});
app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, 'www', 'index.html'))
);

app.listen(port, host, () => console.log(`Listening on port ${port}`));
