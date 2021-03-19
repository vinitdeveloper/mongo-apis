const express = require('express')
const router = express.Router()

const mongodb = require('mongodb')

let db

mongodb.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db()
  }
)

// Create one document
router.post('/', (req, res) => {

    var where = { record_id: req.body.record_id };

    db.collection("documents").find(where).toArray((err, result) => {
        if (err)
            throw err

        if(result.length > 0){

            // req.body.count = result[0].count + 1;
            
            var myquery = { record_id: req.body.record_id };
            var newvalues = { $set: req.body };
            db.collection("documents").updateOne(myquery, newvalues, (err, result) => {
                if (err)
                    throw err
                res.send({
                    record_id: req.body.record_id
                })
            });

        }else{
            
            req.body.count = 0
            
            db.collection("documents").insertOne(req.body, (err, result) => {
                if (err)
                    throw err
                res.send({
                    record_id: req.body.record_id
                })
            });

        }
        
    });

})

// delete 1 records
router.post('/:record_id', (req, res) => {

    var myquery = { record_id: req.params.record_id };
    db.collection("documents").deleteOne(myquery, (err, result) => {
        if (err)
            throw err
        res.send({
            record_id: req.params.record_id
        })
    });

})


// Get all 10 latest documents
router.get('/', (req, res) => {
    db.collection("documents").find().sort({ _id: -1 }).limit(10).toArray((err, result) => {
        if (err)
            throw err
        res.send(result)
    });
})

// Get single record
router.get('/:record_id', (req, res) => {
   
    var where = { record_id: req.params.record_id };

    db.collection("documents").find(where).toArray((err, result) => {
        if (err)
            throw err
        res.send(result[0])
    });

})


module.exports = router