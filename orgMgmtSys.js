const mysql = require("mysql");
const inquirer = require("inquirer");

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
        choices: ["Add a department", "Add a role", "Add an employee", "View a department", "View a role", "View an employee", "Update an employee role"]
    }).then(function (answer) {
        // based on their answer, either corresponding query function
        if (answer.queryAction === "Add a department") {
            addDept();
        } else if (answer.queryAction === "Add a role") {
            addRole();
        }
    });
};

function addDept() {
    inquirer.prompt(
        {
            name: "name",
            type: "input",
            message: "What department would you like to add?"
        }
    ).then(function (newDept) {
        console.log(newDept);
        connection.query("INSERT INTO department SET ?",
            {
                name: newDept.name
            },
            function (err) {
                if (err) throw err;
                console.log("New department added successfully!");
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
            console.log(newRole);
            for (let i = 0; i < results.length; i++) {
                if (results[i].name === newRole.name) {
                    newRole.department_id = results[i].id;
                }
            }
            console.log(newRole);
            connection.query("INSERT INTO role SET ?",
                {
                    title: newRole.title,
                    salary: newRole.salary,
                    department_id: newRole.department_id
                },
                function (err) {
                    if (err) throw err;
                    console.log("New role added successfully!");
                })
        })
    })
}

                // connection.query(
                //     "SELECT title, salary, name FROM department INNER JOIN role ON department.id = role.department_id ", function (err, results) {
                //         if (err) throw err;
                //         console.log(results);
                //     }
                // )