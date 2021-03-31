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
            addEmployee()
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
            updateEmployee()
            break
        default:
            //when Exit is selected, exit program
            process.exit(0);
    }
}

function viewEmployee() {
    connection.query("SELECT first_name, last_name, manager_id, role_name, salary, dept_name FROM employee LEFT JOIN employeerole ON  employee.role_id = employeerole.id LEFT JOIN department ON employeerole.department_id = department.id;", function (err, data) {
        console.table(data);
        init()
    });
}

function viewDepartments() {
    connection.query("SELECT dept_name FROM department", function (err, data) {
        console.table(data);
        init()
    });
}

function viewRoles() {
    connection.query("SELECT role_name, salary, dept_name FROM employeerole LEFT JOIN department ON employeerole.department_id = department.id ", function (err, data) {
        console.table(data);
        init()
    });
}

function addDepartment() {
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

function addRole() {
    connection.query("SELECT * FROM department").then((data) => {
        const deptChoices = [];
        data.forEach(choice => deptChoices.push(choice.dept_name))
        inquirer.prompt([
            {
                name: "role_name",
                type: "input",
                message: "What is the role you would like to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for this role?"
            },
            {
                name: "deptName",
                type: "list",
                message: "What department would you like to add this role to?",
                choices: deptChoices
            }
        ])
            .then((answers) => {
                let dept_id = "";
                for (i = 0; i < data.length; i++) {
                    if (answers.deptName === data[i].dept_name) {
                        dept_id = data[i].id
                    }
                }
                connection.query('INSERT INTO employeerole SET ?',
                    {
                        role_name: answers.role_name,
                        salary: answers.salary,
                        department_id: dept_id
                    })

                init()
            })
    })
}

function addEmployee() {
    connection.query("SELECT * FROM employeerole").then((data) => {
        const roleChoices = [];
        data.forEach(choice => roleChoices.push(choice.role_name))
        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the first name of your new employee?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the last name of your new employee?"
            },
            {
                name: "roleName",
                type: "list",
                message: "What role would you like to add this employee to?",
                choices: roleChoices
            },
            {
                name: "manager_id",
                type: "input",
                message: "What is their manager's ID number?"
            }
        ])
            .then((answers) => {
                let role_id = "";
                for (i = 0; i < data.length; i++) {
                    if (answers.roleName === data[i].role_name) {
                        role_id = data[i].id
                    }
                }

                let manager_id = "";
                if (answers.manager_id === "") {
                    manager_id = 0
                } else {
                    manager_id = answers.manager_id
                }

                connection.query('INSERT INTO employee SET ?',
                    {
                        first_name: answers.first_name,
                        last_name: answers.last_name,
                        role_id: role_id,
                        manager_id: manager_id
                    },
                )

                init()
            })
    })
}

function updateEmployee() {
    connection.query("SELECT * FROM employeerole").then((data) => {
        const roleChoices = [];
        data.forEach(choice => roleChoices.push(choice.role_name))
        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the first name of the employee being updated?"
            },
            {
                name: "roleName",
                type: "list",
                message: "What role would you like to change this employee to?",
                choices: roleChoices
            }
        ])
            .then((answers) => {
                console.log(answers)
                let role_id = "";
                for (i = 0; i < data.length; i++) {
                    if (answers.roleName === data[i].role_name) {
                        role_id = data[i].id
                    }
                }

                connection.query('UPDATE employee SET ? WHERE ?',
                    [{
                        role_id: role_id,
                    },
                    {
                        first_name: answers.first_name
                    }],
                )

                init()
            })
    })

}