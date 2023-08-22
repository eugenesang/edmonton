const express = require('express');
const {createAccount, findByEmail}=require('../models/account');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.get('/signup', (req, res)=>{
    res.render('signup')
})

router.post('/signup', (req, res)=>{
    const {firstName, lastName, email, phone, password} = req.body;
    const fullName = firstName+ ' ' +lastName;
    const hashedPassword = bcrypt.hashSync(password, 10);
    createAccount(fullName, email, phone, hashedPassword, (err, result)=>{
        if(err){
            res.render('error', {message: "Account creation failed, try again latter", status: 500})
        }else{
            console.log(result.insertId);
            let id = jwt.sign({email, id: result.insertId}, process.env.JWT_SECRET);

            req.session.user = id;
            res.redirect('/');
        }
    })
})

router.get('/login', (req, res)=>{
    res.render('login');
})

router.post('/login', (req, res)=>{
    const {email, password}= req.body;
    findByEmail(email, (err, message)=>{
        if(err){
            res.status(500).render('error', {status: 500, message: 'Failed to retrieve account information',  user: null});
        }else{
            if(!message.length){
                return res.status(404).render('error', {message: `Account not found, check your email and try again`, status: 404, user: null});
            }
            const account = message[0];

            if(account){
                let pwdCheck = bcrypt.compareSync(password, account.password);

                if(!pwdCheck){
                    return res.status(403).render('error', {status: 403, message: 'Wrong password', user: null});
                }
                let id = jwt.sign({email, id: account.id}, process.env.JWT_SECRET);
                req.session.user = id;
                res.redirect('/');
            }else{
                return res.status(500).render('error', {status: 500, message: 'Failed to login, check your email and password and try again latter', user: null});
            }
        }
    })
})

router.use('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect('/');
})

router.get('/', (req, res)=>{
    if(req.session.info){
        res.render('account', {...req.session.info, user: req.session.info})
    }else{
        res.status(403).render('error', {status: 403, message: 'You are not authorized to access this page, login or create an account'});
    }
})
module.exports = router;