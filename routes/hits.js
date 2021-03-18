const express = require('express')
const router = express.Router()

const Hit = require('../model/hit');


// Create one hit
router.post('/', (req, res, next) => {
    Hit.create(req.body).then(function(hit){
        res.send({
            record_id: hit.record_id
        });
    }).catch(next);
})

// Update one hit
router.put('/:id', (req, res) => {

    Hit.findOne({record_id: req.params.id}).then(function(hit){
        Hit.update({record_id: req.params.id}, {count: hit.count + 1 } ).then(function(hit){
            res.send({
                record_id: req.params.id
            });
        });
    });

})

// Get all 10 latest hit
router.get('/', (req, res, next) => {
    Hit.find({}).sort({ _id: -1 }).limit(10).then(function(hits){
        res.send(hits);
    }).catch(next);
})

// Get one hit
router.get('/:id', (req, res) => {
    Hit.findOne({record_id: req.params.id}).then(function(hit){
        res.send(hit);
    });
})

module.exports = router