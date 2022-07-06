const start  = require('../server');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { dropManager, createManagerTable, addManagers } = require('./reset');
const connection = require('../db/connections');
// const connection = mysql.createConnection ({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'employees'
// })

// (2)
//  WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids)
// (3) on roles_methods.js

//function if option to view departments is selected
const viewAllDep = () => {
    connection.query(
        `SELECT * FROM departments`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }

            console.table(results);
            start();
        }
    )
}

// (5)
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// (6) on roles_methods.js

// //function if add a department is selected
// const addADep = () => {
//     inquirer
//         .prompt({
//             type: 'text',
//             name: 'department_name',
//             message: 'Enter the name of the department you would like to add: '
//         })
//         .then((data) => {
//             connection.query(
//                 `INSERT INTO departments (name)
//                 VALUES(?)`,
//                 [data.department_name],
//                 function (err, results, fields) {
//                     if (err) {
//                         console.log(err.message);
//                         return;
//                     }

//                     console.log('Added department!');
//                     start();
//                 }
//             )
//         })
// }



module.exports = { viewAllDep, addADep }