const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function(collection) {
  const router = express.Router();

  router.get('/', (req, res) => {
    collection
    .find()
    .toArray()
    .then(docs => res.json(docs))
    .catch(err => {
      console.error(err);
      res.status(500);
      res.json({status: 500, error: err})
    });
  });

  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body;
    collection.findOneAndUpdate(
      {_id: ObjectID(id)},
      {$set: update},
      {returnOriginal: false}
    )
    .then(result => res.json(result.value))
  })

  return router;
};





module.exports = createRouter;
