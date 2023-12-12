const express = require('express');
const {
    saveData
} = require('../models/valuationData.js');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home-valuation');
});


router.post('/appointment', (req, res) => {

    console.log(req.body)

    const {name, email, phone, address} = req.body;
    const minDate = new Date();

    minDate.setDate(minDate.getDate() + 1);

    var date = new Date(req.body.date);
    if(minDate > date){
        date = minDate;
    }
    const time = new Date(req.body.time);

    const [firstName, lastName] = name.split(' ');
    saveData({firstName, lastName, email, phone, address, date, time}, (err, result) => {
        if (err) {
            // Handle the error appropriately (e.g., send an error response)
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Continue with any logic needed, such as redirecting to the next step
            console.log(result);
            res.status(200).json({success: 'Schedule placed'});
        }
    });
});

router.post('/', (req, res)=>{
    res.redirect('/home-valuation');
})

module.exports = router;
