const db = require('./db'); 

async function createAccount(fullName, email, phoneNumber, password, callBack) {
  
    db.query(`INSERT INTO accounts (full_name, email, phone_number, password, createdAt) VALUES (?, ?, ?, ?, ?)`, 
        [fullName, email, phoneNumber, password, new Date().toISOString()], 
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

async function deleteAccount(accountId, callBack) {
    const deleteQuery = `
        DELETE FROM accounts
        WHERE id = ?
    `;
    db.query(deleteQuery, [accountId], (err, result)=>{
        if(err){
            callBack(err)
        }else{
            callBack(null, result)
        }
    });
}

async function changePassword(accountId, newPassword, callBack) {
 
  const updatePasswordQuery = `
    UPDATE accounts
    SET password = ?
    WHERE id = ?
  `;
  db.query(updatePasswordQuery, [newPassword, accountId], (err, result)=>{
        if(err){
            callBack(err)
        }else{
            callBack(null, result)
        }
  });
 
}

async function changeNameAndEmail(accountId, newName, newEmail, callBack) {
    const updateNameAndEmailQuery = `
        UPDATE accounts
        SET full_name = ?, email = ?
        WHERE id = ?
    `;
    db.query(updateNameAndEmailQuery, [newName, newEmail, accountId], (err, result)=>{
        if(err){
            callBack(err)
        }else{
            callBack(null, result)
        }
    });
  
}

function findById(id, callBack){
    db.query(`SELECT * FROM accounts WHERE ID = ?`, [id], (err, result)=>{
        if(err){
            callBack(err);
        }else{
            callBack(null, result);
        }
    })
}

async function findByEmail(email, callBack) {
    const selectAccountQuery = `
      SELECT * FROM accounts
      WHERE email = ?
    `;
    db.query(selectAccountQuery, [email], (err, result)=>{
        if(err){
            callBack(err)
        }else{
            callBack(null, result)
        }
    });
}

module.exports = {
  createAccount,
  deleteAccount,
  changePassword,
  changeNameAndEmail,
  findByEmail,
  findById
};
