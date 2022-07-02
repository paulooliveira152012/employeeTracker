// TODO: Include packages needed for this application
// TODO: Include packages needed for this application
const fs = require('fs')
const inquirer = require('inquirer')

// Array for departments
var departmentArray = [];

function start() {
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
            if(userInput.choice === "viev all departments"){
                viewAllDep(userInput)
            }
            else if (userInput.choice === "view all roles"){
                viewAllRol(userInput)
            }
            else if (userInput.choice === "view all employees"){
                viewAllEmp(userInput)
            }
            else if (userInput.choice === "add a department"){
                addADep(userInput)
            }
            else if (userInput.choice === "add a role"){
                addARol(userInput)
            }
            else if (userInput.choice === "add an employee"){
                addAnEmp(userInput)
            }
            else {
                updAnEmp(userInput)
            }
        }
    )
}



// function viewAllDep(input) {
//     //prompt users with engineer based questions
//     inquirer.prompt(
//         [
//             {
//                 type: "input",
//                 name: "github",
//                 message: "What's their github account?",
//             },
//             {
//                 type: "list",
//                 name: "choice",
//                 message: "would you like to add a new staff member?",
//                 choices: ["yes", "no",]
//             }
//         ] 
        
//     )
// .then(answers => {
//     if(answers.choice === "yes") {
//         const engineerAnswer = new Engineer(
//             input.name, 
//             input.id, 
//             input.email, 
//             answers.github
//         );
//         newStaffMember.push(engineerAnswer);
//         start()
//     } else {
//             const engineerAnswer = new Engineer(
//                 input.name, 
//                 input.id, 
//                 input.email, 
//                 answers.github
//             );
//             newStaffMember.push(engineerAnswer);
//             console.log("Thank you for Using out app")
//             console.log(newStaffMember)
//         createTeam()
//         }
//     }
// )
// }

// function addIntern(input) {
//     inquirer.prompt(
//         [
//             {
//                 type: "input",
//                 name: "school",
//                 message: "What's their school name?"
//             },
//             {
//                 type: "list",
//                 name: "choice",
//                 message: "would you like to add a new staff member?",
//                 choices: ["yes", "no",]
//             }
//         ]
//     )
// .then(answers => {
//     if(answers.choice === "yes") {
//         const internAnswer = new Intern(
//             input.name, 
//             input.id, 
//             input.email, 
//             answers.school
//         );
//         newStaffMember.push(internAnswer);
//         start()
//     } else {  
//         const internAnswer = new Intern(
//                 input.name, 
//                 input.id, 
//                 input.email, 
//                 answers.school
//             );
//             newStaffMember.push(internAnswer);
//             console.log("Thank you for Using out app")
//             console.log(newStaffMember)
//             createTeam()
//             }
//         }
//     )
// }

// function addManager(input) {
//     inquirer.prompt(
//         [
//             {
//                 type: "input",
//                 name: "officeNumber",
//                 message: "What's their office number?"
//             },
//             {
//                 type: "list",
//                 name: "choice",
//                 message: "would you like to add a new staff member?",
//                 choices: ["yes", "no",]
//             }
//         ]
//     )
//     .then(answers => {
//         if(answers.choice === "yes") {
//             const managerAnswer = new Manager(
//                 input.name,
//                 input.id, 
//                 input.email, 
//                 answers.officeNumber,
//                 );
//                 newStaffMember.push(managerAnswer);
//             start()
//         } else {
//             const managerAnswer = new Manager(
//                 input.name,
//                 input.id, 
//                 input.email, 
//                 answers.officeNumber,
//                 );
//                 newStaffMember.push(managerAnswer);
//                 console.log("Thank you for Using out app")
//                 console.log(newStaffMember)
//                 createTeam()
//             }
//         }
//     )
// }

// function createTeam() {
//     console.log("One or more staff member(s) got added to the system")
//     fs.writeFileSync('./dist/index.html', generateMarkdown(newStaffMember))
//   }

// start()