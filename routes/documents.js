const express = require('express')
const router = express.Router()

const Document = require('../model/document');


// Create one document
router.post('/', (req, res, next) => {
    Document.create(req.body).then(function(document){
        res.send({
            record_id: document.record_id
        });
    }).catch(next);
})

// Update one document
router.put('/:id', (req, res) => {
    
    Document.update({record_id: req.params.id}, req.body ).then(function(document){
        res.send({
            record_id: req.params.id
        });
    });
})

// Delete one document
router.delete('/:id', (req, res) => {
    Document.deleteOne({record_id: req.params.id}).then(function(document){
        res.send({
            record_id: req.params.id
        });
    });
})

// Get all 10 latest documents
router.get('/', (req, res, next) => {
    Document.find({}).sort({ _id: -1 }).limit(10).then(function(documents){
        res.send(documents);
    }).catch(next);
})

// Get one document
router.get('/:id', (req, res) => {
    Document.findOne({record_id: req.params.id}).then(function(document){
        res.send(document);
    });
})

module.exports = router