const express = require('express');
const {
    saveData
} = require('../models/valuationData.js');
const router = express.Router();

router.get('/', (req, res) => {
    const page = req.query.page || 1;
    const {firstName, lastName, email, phone} = req.query;

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
    res.render('home-valuation', { page, title, firstName, lastName, phone, email });
});


router.post('/appointment', (req, res) => {
    const step = req.query.step;

    // Assuming req.body contains the form data

    var {firstName, lastName, email, phone} = req.body;

    switch (step) {
        case '1':
            if(!firstName || !lastName){
                res.redirect('/home-valuation?page=1')
            }else{
                res.redirect(`/home-valuation?page=2&firstName=${firstName}&lastName=${lastName}`)
            }
            break;
        case '2':
            if(!firstName || !lastName || !email || !phone){
                res.redirect('/home-valuation?page=1')
            }else{
                res.redirect(`/home-valuation?page=3&firstName=${firstName}&lastName=${lastName}&email=${email}&phone=${phone}`)
            }
            break;
        case '3':
            saveData(req.body, (err, result) => {
                if (err) {
                    // Handle the error appropriately (e.g., send an error response)
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    // Continue with any logic needed, such as redirecting to the next step
                    console.log(result);
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
