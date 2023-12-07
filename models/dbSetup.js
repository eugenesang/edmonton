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

function createHousesTable(){
  const createTableQuery = `
    CREATE TABLE  IF NOT EXISTS houses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        listDate TEXT NOT NULL ,
        mlsNo TEXT NOT NULL ,
        images JSON NOT NULL ,
        showImage TEXT NOT NULL ,
        area TEXT NOT NULL DEFAULT '' ,
        country TEXT NOT NULL ,
        streetName INT NOT NULL ,
        city TEXT NOT NULL ,
        streetNumber INT NOT NULL ,
        unitNumber INT NULL ,
        streetSuffix INT NOT NULL ,
        neighborhood TEXT NOT NULL ,
        state TEXT NOT NULL ,
        streetDirection TEXT NULL ,
        addressLine1 TEXT NOT NULL ,
        addressLine2 TEXT NOT NULL ,
        fullAddress TEXT NOT NULL ,
        soldDate TEXT NULL ,
        soldPrice INT NULL ,
        parkingSpaces INT NOT NULL DEFAULT '0' ,
        bathrooms INT NOT NULL DEFAULT '0' ,
        bathroomsPlus INT NOT NULL DEFAULT '0' ,
        bedrooms INT NOT NULL DEFAULT '0' ,
        bedroomsPlus INT NOT NULL DEFAULT '0' ,
        propertyType TEXT NOT NULL ,
        squareFeet INT NOT NULL DEFAULT '0' ,
        style TEXT NOT NULL ,
        garageSpaces INT NOT NULL ,
        listPrice INT NOT NULL ,
        lastStatus TEXT NOT NULL ,
        status TEXT NOT NULL ,
        boardId INT NOT NULL ,
        link TEXT NOT NULL ,
        offerPrice INT NOT NULL DEFAULT '0' ,
        offerDescription TEXT NOT NULL DEFAULT 'Currently no offer' ,
        showStatus INT NOT NULL 
    )
  `;

  connection.query(createTableQuery, (err, results)=>{
    if (err) {
      console.error('Error creating agents table:', err);
    } else {
      console.log(results);
    }
  })
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

function createValuationTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS valuation (
      id INT AUTO_INCREMENT PRIMARY KEY,
      data TEXT,
      createdAt VARCHAR(20),
      done TEXT
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
  createHousesTable();
  createValuationTable();
}

module.exports = setupDatabase;