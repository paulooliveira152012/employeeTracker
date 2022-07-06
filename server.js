const inquirer = require('inquirer');
const db = require('./db/connections');

const {viewAllEmp, addAnEmp, upAnEmp } = require("./lib/employee");
const {viewAllDep, addADep} = require("./lib/department_methods");
const {viewAllRol, addARol} = require("./lib/roles_methods");
const {addTotalByDep} = require("./lib/budget")

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
                    "update an employee role",
                ]
            }
        ]
        
    )

    .then (
        function(userInput){
            //first console log
            console.log(userInput)
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

start()

// exporting modules 
module.exports = { start };


