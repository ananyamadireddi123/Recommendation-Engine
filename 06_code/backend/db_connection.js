/****
 * This file is for making connection between database and UI
 * 
 ***/


// ALL IMPORTS
const mysql = require('mysql2');
require('dotenv').config({ path: '../.env' })
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbdatabase = process.env.DB_DATABASE;
console.log(dbHost);
// setting up DB config (hard-coded)
const dbConfig = {
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbdatabase,
};
const pool = mysql.createPool(dbConfig);

// exporting the pool promise for avalilability in other files
module.exports = pool.promise();
