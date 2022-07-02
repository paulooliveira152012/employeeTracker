//connect to MySQL database by importing mysql2 package
const mysql = require('mysql2');
const env = require('dotenv');
env.config()

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: process.env.DB_USER,
      // Your MySQL password
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
    },
    console.log('Connected to the employee database.')
  );

  module.exports = db