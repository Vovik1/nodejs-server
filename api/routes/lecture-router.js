const express = require('express');
const router = new express.Router();
const lectureController = require('../controllers/lecture-controller');

router.get('/', (req,res)=>{
    res.send(lectureController.getAll);
});

router.post('/create', (req,res)=>{
    res.send(lectureController.create);
});

module.exports = router;