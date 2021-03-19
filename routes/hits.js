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

            var whereDoc = { record_id: req.body.record_id };

            db.collection("documents").find(whereDoc).toArray((err, resultCount) => {
                if (err){
                    throw err
                }else{

                    var incrementCounted = { $set:{ count : resultCount[0].count + 1 } };
        
                    db.collection("documents").updateOne(whereDoc, incrementCounted, (err, result) => {
                        if (err)
                            throw err
                        res.send({
                            record_id: req.body.record_id
                        })
                    });

                }

            });

        }else{

            var insertData = { 
                                record_id: req.body.record_id, 
                                session_id: req.body.session_id,
                                timestamp: Date() 
                             };
            
            db.collection("hits").insertOne(insertData, (err, result) => {
                if (err){
                    res.send({
                        statuscode : 0,
                        message : 'failed'
                    })
                }
                else{

                    var whereDoc = { record_id: req.body.record_id };

                    db.collection("documents").find(whereDoc).toArray((err, resultCount) => {
                        if (err){
                            throw err
                        }else{

                            var incrementCounted = { $set:{ count : resultCount[0].count + 1 } };
        
                            db.collection("documents").updateOne(whereDoc, incrementCounted, (err, result) => {
                                if (err)
                                    throw err
                                res.send({
                                    record_id: req.body.record_id
                                })
                            });

                        }

                    });
            
                }
               
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

    db.collection("documents").find(where).toArray((err, resultCount) => {
        if (err){
            throw err
        }else{

            let documentCountAll = resultCount[0].count

            db.collection("hits").find(where).sort({ _id: -1 }).limit(10).toArray((err, result) => {
                if (err)
                    throw err
                res.send({
                    count : documentCountAll,
                    hits : result
                })
            });

        }
    });

})


module.exports = router