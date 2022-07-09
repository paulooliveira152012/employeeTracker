const inquirer = require('inquirer');
const connection = require('./db/connections');

function start() {

    // (1)
    // WHEN I start the application
    // THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
    // (2a) on department_methods.js

        //initial prompt 
        inquirer.prompt([

            {
                type: "list",
                name: "choice",
                message: "Choose one of the following options",
                choices: [
                    "viev all departments",
                    "view all roles",
                    "view all employees", 
                    "add a department", 
                    "add a role", 
                    "add an employee", 
                ]
            }
        ]
        
    )

    .then (
        function(userInput){
            //DEPARTMENT 
            if(userInput.choice === "viev all departments"){
                viewAllDep(userInput)
            }
            //ROLE
            else if (userInput.choice === "view all roles"){
                viewAllRol(userInput)
            }
            //EMPLOYEE
            else if (userInput.choice === "view all employees"){
                viewAllEmp(userInput)
            }
            //DEPARTMENT 
            else if (userInput.choice === "add a department"){
                addADep(userInput) 
            }
            //ROLE
            else if (userInput.choice === "add a role"){
                addARol(userInput) 
            }
            //EMPLOYEE
            else if (userInput.choice === "add an employee"){
                addAnEmp(userInput)
            }
            else {
                upAnEmp(userInput)
            }
        }
    )
};



//function to view all departments
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

//function to view all roles
const viewAllRol = () => {
    connection.query(
        `SELECT * FROM roles`,
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




//function if view all employees is selected
const viewAllEmp = () => {
    // creating connection to database
    connection.query(
        `SELECT employees.id, employees.first_name, employees.last_name,
        roles.job_title AS job_title, departments.name, 
        roles.role_salary AS salary, 
        manager.first_name AS manager
        FROM employees
        LEFT JOIN roles
        ON employees.role_id = roles.id
        LEFT JOIN manager
        ON employees.manager_id = manager_id
        LEFT JOIN departments ON roles.department_id = departments.id
        `,
    
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

//function if add a department is selected
const addADep = () => {
    inquirer
        .prompt({
            type: 'text',
            name: 'department_name',
            message: 'Enter the name of the department you would like to add: '
        })
        .then((data) => {
            connection.query(
                `INSERT INTO departments (name)
                VALUES(?)`,
                [data.department_name],
                function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                        return;
                    }

                    console.log('Added department!');
                    start();
                }
            )
        })
}


//function if add role is selected
const addARol = () => {
    connection.query(
        `SELECT * FROM departments`,
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
                        `INSERT INTO roles (job_title, role_salary, department_id)
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

//function if addAnEmp is selected
const addAnEmp = () => {

    // Connect to DB
    connection.query(
        // Select all roles from table for future ref
        `SELECT * FROM roles`,
        function (err, results, fields) {
            if (err) {
                console.log("any errors? -->", err.message);
                return;
            }
            //why 

            // Create empty array for storing info
            let roleArr = [];
            console.log("role array 238 --> ", roleArr)

            // for each item in the results array, push the name of the roles to the roles array
            results.forEach(item => {
                roleArr.push(item.job_title)
            })
            // roleArr = ["manager", "princess"]
            console.log("role array 245 ->", roleArr)
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
                    console.log("manager array 258 ->", manArr)

                    // For each item in results array, push the name of the manager to the manager array
                    results.forEach(item => {
                        manArr.push(item.first_name)
                    });

                    console.log("manager array 265 ->", manArr)

                    // Prompt the user
                    inquirer
                        .prompt([
                            {
                                type: 'text',
                                name: 'first_name',
                                message: 'What is your employees first name?'
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
                                // when: ({ mngt_confirm }) => {
                                //     if (!mngt_confirm) {
                                //         return true;
                                //     } else {
                                //         return false;
                                //     }
                                // },
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
                                `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)`,
                                [data.first_name, data.last_name, role_id, manager_id],
                                function (err, results, fields) {
                                    if (err) {
                                        console.log(err.message);
                                        return;
                                    }
                                    // // Drop the manager table in order to re-update manager table
                                    // dropManager();
                                    // Re-Create the manager table
                                    // createManagerTable();
                                    // Add new and current managers to table
                                    // addManagers();
                                    console.log('Employee succesfully added!');
                                    // Reset to main screen
                                    start();
                                }
                            );
                        });
                }
            );
        }
    );
};

start()