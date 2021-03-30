const connection = require("./db");
const inquirer = require("inquirer");

init()

async function init() {
    const { whatToDo } = await inquirer.prompt({
        name: "whatToDo",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add Employee", "Add Department", "Add Role", "Update Employee" ]
    })
}