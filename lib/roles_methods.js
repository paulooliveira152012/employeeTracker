const { promptUser } = require('../index');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees'
});

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

//function if add role is selected
const addARol = () => {
    connection.query(
        `SELECT * FROM department`,
        function (err, results, fields) {
            if (err) {
                console.log(err);
                return;
            }

            let depArr = [];
            results.forEach(item => {
                depArr.push(item.name)
            })

            inquirer
                .prompt([
                    {
                        type: 'text',
                        name: 'role_title',
                        message: 'Enter the name of the role you would like to add: '
                    },
                    {
                        type: 'number',
                        name: 'salary',
                        message: 'Enter the salary of this role. Note: Please do not use commas or periods'
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Select the department you role will be a part of: ',
                        choices: depArr
                    }
                ])
                .then((data) => {
                    let department_id;

                    for (let i = 0; i < depArr.length; i++) {
                        if (depArr[i] === data.department) {
                            department_id = i + 1;
                        };
                    };

                    connection.query(
                        `INSERT INTO roles (title, salary, department_id)
                            VALUES(?,?,?)`,
                        [data.role_title, data.salary, department_id],
                        function (err, results, fields) {
                            if (err) {
                                console.log(err.message);
                                return;
                            }

                            console.log('Role added!')
                            start();
                        }
                    );
                });
        }
    );
};

module.exports = {viewAllRol, addARol};