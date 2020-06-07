const express = require('express');
const app = express();
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const cors = require('cors');

app.use(parser.json());
app.use(cors());

MongoClient.connect('mongodb://localhost:27017')
.then((client) => {
  const db = client.db('shares_db');

  const sharesCollection = db.collection('shares');
  const sharesRouter = createRouter(sharesCollection);
  app.use('/api/shares', sharesRouter)

  const symbolsDb = client.db('symbols_db');

  const symbolsCollection = db.collection('symbols');
  const symbolsRouter = createRouter(symbolsCollection);
  app.use('/api/symbols', symbolsRouter)

})
.catch(console.error);

app.listen(3000, function () {
  console.log('Its on!')
})
