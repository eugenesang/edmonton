const express = require('express');
const { create } = require('../models/valuationData.js')
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('home-valuation');
})

router.post('/collect',  (req, res)=>{
    const data = req.body;
    create(data, (err, data)=>{
        if(err){
            res.status(400).render()
        }
    })

})

module.exports = router;