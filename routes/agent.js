const express = require('express');
const { createAgent, checkExistingAccount } = require('../models/agent'); // Assuming you have a function for checking existing accounts
const router = express.Router();
const officials = require('../utils/officials');


router.get('/', (req, res) => {
    res.render('agent-signup', { user: req.session.info ? req.session.info : null });
});

router.get('/signup', (req, res) => {
    res.render('agent-signup', { user: req.session.info ? req.session.info : null });
});

router.post('/apply', async (req, res) => {
    const agentData = req.body;
    console.log(agentData);
    try {
        checkExistingAccount(agentData.email, agentData.phone_number, (err, data)=>{
            if(err){
                return res.status(500).render('error', {message: "Internal Server Error!", status: 500, user: req.session.info ? req.session.info : null })
            }
            if(data){
                console.log(data);
            }
    
            createAgent(agentData, (error, result) => {
                if (error) {
                    console.error('Error creating agent account:', error);
                    res.status(500).render('error', { message: 'An error occurred while creating the agent account.', status: 500, user: req.session.info ? req.session.info : null });
                } else {
                    res.redirect('/');
                }
            });
        })
    } catch (error) {
        return res.status(500).render('error', {message: "Internal Server Error!", status: 500, user: req.session.info ? req.session.info : null })
    }
});

router.get('/officials', (req, res)=>{
    res.render('our-officials.ejs', {officials, user: req.session.info ? req.session.info : null})
})
module.exports = router;
