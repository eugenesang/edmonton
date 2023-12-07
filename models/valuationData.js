const db = require('./db');

function create(data, callBack){
    db.query(`INSERT INTO valuation (data, createdAt, done) VALUES (?, ?, ?)`, 
        [data, new Date().toISOString(), "false"], 
        (err, result)=>{
            if(err){
                console.log(err)
                callBack(err)
            }else{
                console.log(result)
                callBack(null, result)
            }
    });
}

function getAll(callBack){
    db.query(`SELECT * FROM valuation`, 
    [],
    (err, data)=>{
        if(err){
            console.log(err)
            callBack(err)
        }else{
            console.log(result)
            callBack(null, result)
        }
    })
}

module.exports = {
    create, getAll
}