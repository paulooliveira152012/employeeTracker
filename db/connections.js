//connect to MySQL database by importing mysql2 package
const mysql = require('mysql2');
const env = require('dotenv');
env.config()

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: "root",
      // Your MySQL password
      database: 'employee_db',
    },
    console.log('Connected to the employee database.')
  );

  module.exports = db