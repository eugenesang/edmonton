const db = require('./db');

// Function to save data for Step 1
function saveStep1Data(data, callBack) {
  const { firstName, lastName } = data;

  db.query(
    'INSERT INTO valuation (firstName, lastName, createdAt, done) VALUES (?, ?, ?, ?)',
    [firstName, lastName, new Date().toISOString(), 'false'],
    (err, result) => {
      if (err) {
        console.error('Error saving Step 1 data:', err);
        callBack(err);
      } else {
        console.log('Step 1 data saved successfully');
        callBack(null, result);
      }
    }
  );
}

// Function to save data for Step 2
function saveStep2Data(data, callBack) {
  const { email, phone } = data;

  db.query(
    'UPDATE valuation SET email = ?, phone = ?, done = ? WHERE id = ?',
    [email, phone, 'false', data.id],
    (err, result) => {
      if (err) {
        console.error('Error saving Step 2 data:', err);
        callBack(err);
      } else {
        console.log('Step 2 data saved successfully');
        callBack(null, result);
      }
    }
  );
}

// Function to save data for Step 3
function saveStep3Data(data, callBack) {
  const { address, date, time } = data;

  db.query(
    'UPDATE valuation SET address = ?, date = ?, time = ?, done = ? WHERE id = ?',
    [address, date, time, 'true', data.id],
    (err, result) => {
      if (err) {
        console.error('Error saving Step 3 data:', err);
        callBack(err);
      } else {
        console.log('Step 3 data saved successfully');
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
  saveStep1Data,
  saveStep2Data,
  saveStep3Data,
  getAll,
  getById
};
