const { promptUser, start } = require('../server')
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { dropManager, createManagerTable, addManagers } = require('./reset');

const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees'
})

//(4)
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// (5) on department_methods.js

//function if view all employees is selected
const viewAllEmp = () => {
    // creating connection to database
    connection.query(
        `SELECT employees.id, employees.first_name, employees.last_name, roles.job_title AS role, roles.role_salary, manager.first_name AS manager,
        departments.name AS department
        FROM employees
        LEFT JOIN roles
        ON employees.role_id = roles.id
        LEFT JOIN department
        ON roles.department_id = departments.id
        LEFT JOIN manager
        ON employees.manager_id = manager.id`,
        //callback
        function (err, results, field) {
            if(err) {
                console.log(err.message);
                return
            }
            //display table
            console.table(results);
            start()
        }
    )
};

// (7)
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// (8) right below

//function if addAnEmp is selected
const addAnEmp = () => {

    // Connect to DB
    connection.query(
        // Select all roles from table for future ref
        `SELECT * FROM roles`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }

            // Create empty array for storing info
            let roleArr = [];

            // for each item in the results array, push the name of the roles to the roles array
            results.forEach(item => {
                roleArr.push(item.title)
            })
            // Connect to db again 
            connection.query(
                // Select all managers from managers table for future ref
                `SELECT * FROM manager`,
                function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                        return;
                    }

                    // Create empty array for managers
                    let manArr = [];

                    // For each item in results array, push the name of the manager to the manager array
                    results.forEach(item => {
                        manArr.push(item.first_name)
                    });

                    // Prompt the user
                    inquirer
                        .prompt([
                            {
                                type: 'text',
                                name: 'first_name',
                                message: 'What is you employees first name?'
                            },
                            {
                                type: 'text',
                                name: 'last_name',
                                message: 'What is your employees last name?'
                            },
                            {
                                type: 'list',
                                name: 'role_pick',
                                message: 'What will you employees role be?',
                                // use the names from the roles array to get the roles, this will allow us to add new roles in the future
                                choices: roleArr
                            },
                            {
                                type: 'confirm',
                                name: 'mngt_confirm',
                                message: 'Is your employees role a manager position?'
                            },
                            {
                                type: 'list',
                                name: 'mngt_pick',
                                message: 'Who will your employees manager be?',
                                // If the user confirms the emp is a manager, then do not run this prompt
                                when: ({ mngt_confirm }) => {
                                    if (!mngt_confirm) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                },
                                // Choices will be the names from the manager array
                                choices: manArr
                            }
                        ])
                        .then((data) => {
                            // Create a loop of the role arr in order to compare the users answer to the position it is in in the array,
                            // this will provide us with a number that can be used as an id for the role_id section of our table
                            let role_id;
                            for (i = 0; i < roleArr.length; i++) {
                                if (data.role_pick === roleArr[i]) {
                                    role_id = i + 1
                                }
                            }

                            // if statement that will decide weather or not based on users input if the employee is a manager or not 
                            let manager_confirm;
                            if (data.mngt_confirm === true) {
                                manager_confirm = 1;
                            } else {
                                manager_confirm = 0
                            }

                            let manager_id;

                            // if the mngt_pick prompt was not run and returns nothing set the manager_id to null
                            if (!data.mngt_pick) {
                                manager_id = null;
                                // else Create a loop of the manager arr in order to compare the users answer to the position it is in in the array,
                                // this will provide us with a number that can be used as an id for the manager_id section of our table
                            } else {
                                for (i = 0; i < manArr.length; i++) {
                                    if (data.mngt_pick === manArr[i]) {
                                        manager_id = i + 1
                                    }
                                }
                            }
                            // Connect to db again
                            connection.query(
                                // Insert values from user into db, uses place holders to prevent SQL Injection attack
                                `INSERT INTO employee (first_name, last_name, role_id, manager_id, manager_confirm)
                                    VALUES (?, ?, ?, ?, ?)`,
                                [data.first_name, data.last_name, role_id, manager_id, manager_confirm],
                                function (err, results, fields) {
                                    if (err) {
                                        console.log(err.message);
                                        return;
                                    }
                                    // Drop the manager table in order to re-update manager table
                                    dropManager();
                                    // Re-Create the manager table
                                    createManagerTable();
                                    // Add new and current managers to table
                                    addManagers();
                                    console.log('Employee succesfully added!');
                                    // Reset to main screen
                                    promptUser();
                                }
                            );
                        });
                }
            );
        }
    );
};

// (8)
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

const upAnEmp = () => {
    // Select all roles from table for future ref
    connection.query(
        `SELECT * FROM roles`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }

            // Create empty array for storing info
            let roleArr = [];

            // for each item in the results array, push the name of the roles to the roles array
            results.forEach(item => {
                roleArr.push(item.title)
            })
            connection.query(
                `SELECT first_name, last_name FROM employee`,
                function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                    }

                    let nameArr = [];
                    results.forEach(item => {
                        nameArr.push(item.first_name);
                        nameArr.push(item.last_name);
                    })
                    let combinedNameArr = [];
                    for (let i = 0; i < nameArr.length; i += 2) {
                        if (!nameArr[i + 1])
                            break
                        combinedNameArr.push(`${nameArr[i]} ${nameArr[i + 1]}`)
                    }
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'name_select',
                                message: 'Please select an employee you would like to update',
                                choices: combinedNameArr
                            },
                            {
                                type: 'list',
                                name: 'role_select',
                                message: 'Please select a role you would like your employee to change to:',
                                choices: roleArr
                            }
                        ])
                        .then((data) => {
                            let role_id;
                            for (let i = 0; i < roleArr.length; i++) {
                                if (data.role_select === roleArr[i]) {
                                    role_id = i + 1;
                                }
                            };
                            let selectedNameArr = data.name_select.split(" ");
                            let last_name = selectedNameArr.pop();
                            let first_name = selectedNameArr[0];

                            connection.query(
                                `UPDATE employee 
                                        SET role_id = ?
                                        WHERE first_name = ? AND last_name = ?`,
                                [role_id, first_name, last_name],
                                function (err, results, fields) {
                                    if (err) {
                                        console.log(err.message);
                                        return;
                                    }
                                    console.log('Employee updated!');
                                    promptUser();
                                }
                            );
                        });
                }
            );

        }
    );
};

module.exports = {viewAllEmp, addAnEmp, upAnEmp};