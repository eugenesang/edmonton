const mysql = require('mysql')
const pool = require('./db');
/**
 * 
 * @param {mysql.MysqlError} err 
 * @param {mysql.OkPacket} data 
 */
function cb(err, data){
    
}

/**
 * 
 * @param {mysql.Query} query 
 * @param {Array} values 
 * @param {cb} callBack 
 */
function queryHandler(query, values, callBack){
    pool.query(query, values, (err, data)=>{
        if (err) {
            callBack(err)
        } else {
            callBack(null, data)
        }
    })
}

/**
 * 
 * @param {} 
 * @param {cb} callback 
 */
function createAgent(agentData, callback) {
    const { first_name, last_name, email, phone_number, website, city_area, province, existing_brokerage, account_type, franchise_interest, additional_info} = agentData;

    const insertQuery = `
    INSERT INTO agents (first_name, last_name, email, phone_number, website, city_area, province, existing_brokerage, account_type, franchise_interest, additional_info, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [ first_name, last_name, email, phone_number, website, city_area, province, existing_brokerage, account_type, franchise_interest, additional_info, new Date().toISOString()];
    queryHandler(insertQuery, values, callback);
}


async function deleteAgent(agentId, callBack) {
    queryHandler(`DELETE FROM agents WHERE id = ?`, [agentId], callBack);
}

function editAgent(agentData, callBack) {
    const { first_name, last_name, website, city_area, province, existing_brokerage, account_type, id} = agentData;

    const query = `
    UPDATE agents SET (first_name, last_name, website, city_area, province, existing_brokerage, account_type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?) WHERE ID = ?
  `;

    const values = [ first_name, last_name, website, city_area, province, existing_brokerage, account_type, new Date().toISOString()];
    queryHandler(query, values, callBack);
}

async function changePassword(agentId, newPassword, callBack) {
    queryHandler(`UPDATE agents SET password = ? WHERE id = ?`, [newPassword, agentId], callBack);
}

async function changeEmail(agentId, newEmail, callBack) {
    queryHandler(`UPDATE agents SET email = ? WHERE id = ?`, [newEmail, agentId], callBack);
}

function findByPhone(phone, callBack){
    queryHandler(`SELECT * FROM agents WHERE phone = ?`, [phone], callBack)
}
function findById(id, callBack) {
    queryHandler(`SELECT * FROM agents WHERE ID = ?`, [id], callBack)
}

async function findByEmail(email, callBack) {
    queryHandler(`SELECT * FROM agents WHERE email = ?`, [email], callBack);
}

function verify(adminId, adminSignature, comment, agentId, callBack){
    const verification = JSON.stringify({
        date: new Date().toISOString(),
        by: adminId,
        adminSignature,
        comment,
        agent: agentId
    });

    queryHandler(`UPDATE agents SET verification = ?`, [verification], callBack);
}

function checkExistingAccount(email, phoneNumber, callBack) {
    queryHandler('SELECT COUNT(*) AS count FROM agents WHERE email = ? OR phone_number = ?', [email, phoneNumber], callBack)
}

module.exports = {
    createAgent,
    editAgent,
    changePassword,
    changeEmail,
    findByPhone,
    findById,
    findByPhone,
    findByEmail,
    verify,
    checkExistingAccount
};
