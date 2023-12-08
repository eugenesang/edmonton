const db = require('./db');

// Function to save data for Step 1
function saveData(data, callBack) {
    const { firstName, lastName, email, phone, address, date, time } = data;

    db.query(
        'INSERT INTO valuation (firstName, lastName, email, phone, address, date, time, createdAt, done) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [firstName, lastName, email, phone, address, date, time, new Date().toISOString(), 'false'],
        (err, result) => {
            if (err) {
                console.error('Error saving data:', err);
                callBack(err);
            } else {
                console.log('Data saved successfully');
                callBack(null, result);
            }
        }
    );
}


// Function to get data by ID
function getById(id, callBack) {
    db.query('SELECT * FROM valuation WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(`Error getting data with ID ${id}:`, err);
            callBack(err);
        } else {
            console.log(`Data with ID ${id} retrieved successfully`);
            callBack(null, result);
        }
    });
}

// Function to get all valuation data
function getAll(callBack) {
    db.query('SELECT * FROM valuation', [], (err, data) => {
        if (err) {
            console.error(err);
            callBack(err);
        } else {
            console.log(data);
            callBack(null, data);
        }
    });
}

module.exports = {
    saveData,
    getAll,
    getById
};
