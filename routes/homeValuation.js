const express = require('express');
const {
    saveStep1Data,
    saveStep2Data,
    saveStep3Data
} = require('../models/valuationData.js');
const router = express.Router();

router.get('/', (req, res) => {
    const page = req.query.page || 1;
    const title = (()=>{
        if(page == 1){
            return "Your Basic Information"
        }else if(page == 2){
            return "Your Contact Information"
        }else if(page == 3){
            return "Property Address"
        }else{
            return "An Error Occurred"
        }
    })()
    res.render('home-valuation', { page, title });
});


router.post('/appointment', (req, res) => {
    const step = req.query.step;

    // Assuming req.body contains the form data

    switch (step) {
        case '1':
            saveStep1Data(req.body, (err, result) => {
                if (err) {
                    // Handle the error appropriately (e.g., send an error response)
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    // Continue with any logic needed, such as redirecting to the next step
                    res.redirect('/home-valuation?page=2');
                }
            });
            break;
        case '2':
            saveStep2Data(req.body, (err, result) => {
                if (err) {
                    // Handle the error appropriately (e.g., send an error response)
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    // Continue with any logic needed, such as redirecting to the next step
                    res.redirect('/home-valuation?page=3');
                }
            });
            break;
        case '3':
            saveStep3Data(req.body, (err, result) => {
                if (err) {
                    // Handle the error appropriately (e.g., send an error response)
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    // Continue with any logic needed, such as redirecting to the next step
                    res.redirect('/home-valuation/appointment-success');
                }
            });
            break;
        default:
            res.status(400).json({ error: 'Invalid step' });
            break;
    }
});

module.exports = router;
