//load in requirements
const connection = require("./db");
const inquirer = require("inquirer");

const viewEmployee = require("./lib/viewEmployee");

//start app
init()

//async to control timing
async function init() {
    set up to await the answers
    const { whatToDo } = await inquirer.prompt({
        name: "whatToDo",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add Employee", "Add Department", "Add Role", "Update Employee", "Exit"]
    });

    //then based on answer, issue function
    switch (whatToDo) {
        case "View All Employees":
            //display table of all employees
            // console.table()
            break
        case "View All Employees by Department":
            //display table all employees in a department 
            break
        case "View All Employees by Manager":
            //display table with the same manager
            break
        case "Add Employee":
            //create new employee
            break
        case "Add Department":
            //create new department
            break
        case "Add Role":
            //create new job role in a department
            break
        case "Update Employee":
            //update an existing employee
            break
        default:
            //when Exit is selected, exit program
            process.exit(0);
    }
}



