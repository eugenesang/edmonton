const jwt = require('jsonwebtoken')
const express = require('express');
const {findById} = require('../models/account')

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function checkLogin(req, res, next){
    if(req.session.user){
        console.log('Session id', req.session.user)
        let rawData = jwt.verify(req.session.user, process.env.JWT_SECRET);
        findById(rawData.id, (err, data)=>{
            
            if(err){
                next();
                return
            } 
            if(!data.length){
                next();
                return;
            }else{
                req.session.info = data[0];
                next();
                return
            }
        })
    }else{
        console.log('no session info ', req.session);
        next();
    }
    
}

module.exports = checkLogin;