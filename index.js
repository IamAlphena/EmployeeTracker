//load in requirements
const connection = require("./db");
const inquirer = require("inquirer");

// const Functions = require("./lib/functions");

//start app
init()

//async to control timing
async function init() {
    // set up to await the answers
    const { whatToDo } = await inquirer.prompt({
        name: "whatToDo",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employee", "Add Department", "Add Role", "Update Employee", "Exit"]
    });

    //then based on answer, issue function
    switch (whatToDo) {
        case "View All Employees":
            //display table of all employees
            viewEmployee()
            break
        case "View All Departments":
            //display table of all departments 
            viewDepartments()
            break
        case "View All Roles":
            //display all Roles
            viewRoles()
            break
        case "Add Employee":
            //create new employee
            break
        case "Add Department":
            //create new department
            addDepartment()
            break
        case "Add Role":
            //create new job role in a department
            addRole()
            break
        case "Update Employee":
            //update an existing employee
            break
        default:
            //when Exit is selected, exit program
            process.exit(0);
    }
}

function viewEmployee (){
    connection.query("SELECT * FROM employee LEFT JOIN employeerole ON  employee.role_id = employeerole.id LEFT JOIN department ON employeerole.department_id = department.id;", function(err,data){
        console.table(data);
        init()
    });
}

function viewDepartments (){
    connection.query("SELECT * FROM department", function(err,data){
        console.table(data);
        init()
    });
}

function viewRoles (){
    connection.query("SELECT * FROM employeeroles", function(err,data){
        console.table(data);
        init()
    });
}

function addDepartment (){
    inquirer.prompt({
        name: "dept_name",
        type: "input",
        message: "What department would you like to add?"
    })
    .then((data) => {
        connection.query('INSERT INTO department SET ?', data)
        init()
    });
}


function addRole (){
    connection.query("SELECT * FROM department").then((data) => {
        // console.log(data)
        const deptChoices = [];
        data.forEach( choice => deptChoices.push(choice.dept_name))
        console.log(deptChoices)
    inquirer.prompt({
        name: "dept_id",
        type: "list",
        message: "What department would you like to add this role to?",
        choices: deptChoices
    })
 })
}

// function addEmployee(){
//     inquirer.prompt([{

//     }])

// }
