const connection = require('./db')

// Function to create 'accounts' table
function createAccountsTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS accounts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE KEY,
      phone_number VARCHAR(20) UNIQUE KEY,
      password VARCHAR(255) NOT NULL,
      createdAt VARCHAR(20)
    )
  `;

  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating accounts table:', err);
    } else {
      console.log(results);
    }

  });
}


function createAgentsTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS agents (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE KEY,
      phone_number VARCHAR(20) UNIQUE KEY,
      website VARCHAR(255),
      city_area VARCHAR(255),
      province VARCHAR(255),
      existing_brokerage VARCHAR(255),
      account_type VARCHAR(20) NOT NULL,
      franchise_interest BOOLEAN,
      additional_info TEXT,
      createdAt VARCHAR(20),
      password VARCHAR(255),
      verification VARCHAR(255)
    )
  `;

  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating agents table:', err);
    } else {
      console.log(results);
    }
  });
}


function setupDatabase() {
  createAccountsTable();
  createAgentsTable();
}

module.exports = setupDatabase;