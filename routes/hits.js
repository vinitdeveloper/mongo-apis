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

    var where = { record_id: req.body.record_id, session_id: req.body.session_id };

    db.collection("hits").find(where).toArray((err, result) => {
        if (err)
            throw err

        if(result.length > 0){
            
            var newvalues = { $set: { count : result[0].count + 1 } };
            db.collection("hits").updateOne(where, newvalues, (err, result) => {
                if (err)
                    throw err
                res.send({
                    record_id: req.body.record_id
                })
            });

        }else{

            var insertData = { 
                                record_id: req.body.record_id, 
                                session_id: req.body.session_id,
                                count: 0, 
                                timestamp: Date() 
                             };
            
            db.collection("hits").insertOne(insertData, (err, result) => {
                if (err)
                    throw err
                res.send({
                    record_id: req.body.record_id
                })
            });

        }
        
    });

})

// Get all 10 latest documents
router.get('/', (req, res) => {
    db.collection("hits").find().sort({ _id: -1 }).limit(10).toArray((err, result) => {
        if (err)
            throw err
        res.send(result)
    });
})

// Get single record
router.get('/:record_id', (req, res) => {
   
    var where = { record_id: req.params.record_id };

    db.collection("hits").find(where).toArray((err, result) => {
        if (err)
            throw err
        res.send(result[0])
    });

})


module.exports = router