
const inquirer = require('inquirer');
const mysql = require('mysql2');
const start = require('../server');
const connection = require('../db/connections');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'employees'
// });

// (3)
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

//function if view roles is selected
const viewAllRol = () => {
    connection.query(
        `SELECT roles.job_title, roles.id, departments.name, roles.role_salary 
            FROM roles
            LEFT JOIN department
            ON roles.department_id = departments.id `,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }

            console.table(results);
            start();
        }
    );
};

// (6)
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// (7) on employee.js



module.exports = {viewAllRol, addARol};