const db = require('./db');

const pool = require('./db');

function createAgentAccount(agentData, callback) {
    const { first_name, last_name, email, phone_number, website, city_area, province, existing_brokerage, account_type, franchise_interest, additional_info} = agentData;

    const insertQuery = `
    INSERT INTO agents (first_name, last_name, email, phone_number, website, city_area, province, existing_brokerage, account_type, franchise_interest, additional_info, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [ first_name, last_name, email, phone_number, website, city_area, province, existing_brokerage, account_type, franchise_interest, additional_info, new Date().toISOString()];

    pool.query(insertQuery, values, (err, result) => {
        if (err) {
            console.error('Error creating agent account:', err);
            return callback(err);
        }

        console.log('Agent account created:', result);
        callback(null, result);
    });
}


async function deleteAgent(agentId, callBack) {
    const deleteQuery = `
        DELETE FROM agents
        WHERE id = ?
    `;
    db.query(deleteQuery, [accountId], (err, result) => {
        if (err) {
            callBack(err)
        } else {
            callBack(null, result)
        }
    });
}

async function changePassword(agentId, newPassword, callBack) {

    const updatePasswordQuery = `
    UPDATE accounts
    SET password = ?
    WHERE id = ?
  `;
    db.query(updatePasswordQuery, [newPassword, accountId], (err, result) => {
        if (err) {
            callBack(err)
        } else {
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
    db.query(updateNameAndEmailQuery, [newName, newEmail, accountId], (err, result) => {
        if (err) {
            callBack(err)
        } else {
            callBack(null, result)
        }
    });

}

function findById(id, callBack) {
    db.query(`SELECT * FROM accounts WHERE ID = ?`, [id], (err, result) => {
        if (err) {
            callBack(err);
        } else {
            callBack(null, result);
        }
    })
}

async function findByEmail(email, callBack) {
    const selectAccountQuery = `
      SELECT * FROM accounts
      WHERE email = ?
    `;
    db.query(selectAccountQuery, [email], (err, result) => {
        if (err) {
            callBack(err)
        } else {
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
