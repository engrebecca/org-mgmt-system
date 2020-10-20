const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// Create connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "company_org_db"
});

// Connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // Run the start function after the connection is made to prompt the user
    start();
});

// Function which prompts the user for what action they should take
function start() {
    inquirer.prompt({
        name: "queryAction",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add a department", "Add a role", "Add an employee", "View departments", "View roles", "View employees", "Update an employee role"]
    }).then(function (answer) {
        // based on their answer, either corresponding query function
        if (answer.queryAction === "Add a department") {
            addDept();
        } else if (answer.queryAction === "Add a role") {
            addRole();
        } else if (answer.queryAction === "Add an employee") {
            addEmployee();
        } else if (answer.queryAction === "View departments") {
            viewDept();
        } else if (answer.queryAction === "View roles") {
            viewRoles();
        } else if (answer.queryAction === "View employees") {
            viewEmployees();
        }
    })
}

function addDept() {
    inquirer.prompt(
        {
            name: "name",
            type: "input",
            message: "What department would you like to add?"
        }
    ).then(function (newDept) {
        connection.query("INSERT INTO department SET ?",
            {
                name: newDept.name
            },
            function (err) {
                if (err) throw err;
                console.log("New department added successfully!");
                start();
            })
    })
}

function addRole() {
    connection.query("SELECT * FROM department", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of the new role to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of the new role?"
            },
            {
                name: "name",
                type: "list",
                message: "What is the department for this new role?",
                choices: function () {
                    let choiceArr = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArr.push(results[i].name)
                    }
                    return choiceArr;
                }
            }
        ]).then(function (newRole) {
            for (let i = 0; i < results.length; i++) {
                if (results[i].name === newRole.name) {
                    newRole.department_id = results[i].id;
                }
            }
            connection.query("INSERT INTO role SET ?",
                {
                    title: newRole.title,
                    salary: newRole.salary,
                    department_id: newRole.department_id
                },
                function (err) {
                    if (err) throw err;
                    console.log("New role added successfully!");
                    start();
                })
        })
    })
}

function addEmployee() {
    connection.query(
        "SELECT employee.first_name, employee.last_name, role.title, CONCAT(person.first_name,' ', person.last_name) as manager FROM employee RIGHT JOIN role ON employee.role_id = role.id LEFT JOIN employee as person on employee.manager_id = person.id", function (err, results) {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "What is the employee's first name?"
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "What is the employee's last name?"
                },
                {
                    name: "title",
                    type: "list",
                    message: "What is the employee's title?",
                    choices: function () {
                        let titleArr = [];
                        for (let i = 0; i < results.length; i++) {
                            if (titleArr.indexOf(results[i].title) == -1) {
                                titleArr.push(results[i].title);
                            }
                        }
                        return titleArr;
                    }
                },
                {
                    name: "manager",
                    type: "list",
                    message: "What is their manager?",
                    choices: function () {
                        let managerArr = [];
                        // let managerNameArr = ["This is the manager array"];
                        for (let i = 0; i < results.length; i++) {
                            if (results[i].manager !== null && managerArr.indexOf(results[i].manager) == -1) {
                                managerArr.push(results[i].manager);
                            }
                        }
                        return managerArr;
                    }
                }
            ]).then(function (newEmployee) {
                connection.query("SELECT * FROM employee", function (err, results) {
                    for (let i = 0; i < results.length; i++) {
                        if (`${results[i].first_name} ${results[i].last_name}` === newEmployee.manager) {
                            newEmployee.manager_id = results[i].id;
                        }
                    }
                    connection.query("SELECT * FROM role", function (err, results) {
                        for (let i = 0; i < results.length; i++) {
                            if (results[i].title === newEmployee.title) {
                                newEmployee.role_id = results[i].id;
                                connection.query("INSERT INTO employee SET ?",
                                    {
                                        first_name: newEmployee.first_name,
                                        last_name: newEmployee.last_name,
                                        role_id: newEmployee.role_id,
                                        manager_id: newEmployee.manager_id
                                    },
                                    function (err) {
                                        if (err) throw err;
                                        console.log("New employee added successfully!");
                                        start();
                                    })
                            }
                        }
                    })
                })
            })
        }
    )
}

function viewDept() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewRoles() {
    connection.query("SELECT title, salary, name FROM role INNER JOIN department WHERE role.department_id = department.id", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, CONCAT(person.first_name,' ', person.last_name) as manager FROM employee INNER JOIN role ON employee.role_id = role.id LEFT JOIN employee as person on employee.manager_id = person.id", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}
// How to select manager names from employee.manager_id
// SELECT employee.first_name, employee.last_name, role.title, CONCAT(person.first_name,' ', person.last_name) as manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN employee as person on employee.manager_id = person.id;