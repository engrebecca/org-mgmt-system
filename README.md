# Organization Management System

## Description
Organization Management System is a command line interface that allows business owners to view and manage their employee organization. It includes features to manage departments, roles, and employees. The easy to use interface allows business owners to better plan and organize their employees.

## Installation
        npm install

## Usage
1. Install necessary dependencies through the command "npm install"
2. Initiate the program with the command "node orgMgmtSys.js"
3. Select an option from the Inquirer menu to add, view, or update specifc data
4. Continue to cycle through the option menu until all updates are complete
5. Exit the program 

## Features
* The MySQL NPM package is used to connect to a MySQL database and perform queries
    * INSERT INTO queries are used to add data into tables
    * SELECT queries are used to pull and display data
    * UPDATE queries are used to update existing data
* The Inquirer NPM package is used to gather user input from the command line
    * Prompts are used to gather user inputs, they return objects which are then used in MySQL queries
* The console.table NPM package is used to format data into tables in command line
    * Console.table is used in SELECT queries to display and format data into tables

## Built With
* [MySQL](https://www.mysql.com/) - a relational database management system
* [Inquirer](https://www.npmjs.com/search?q=inquirer) - a NPM package for interactive command line user interfaces
* [Console.table](https://www.npmjs.com/package/console.table) - a NPM package for formatting table data in command line
* [Node.js](https://nodejs.org/en/) - a JavaScript runtime environment that allows JavaScript to be run in command line
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - code that creates the logic and structure of the program
* [Git](https://git-scm.com/) - version control system to track changes in source code
* [GitHub](https://github.com/) - hosts repository and deploys page on GitHub

## Code
The below code demonstrates how a MySQL query with multiple JOINS is used to select and display data from a MySQL database

        function viewEmployees() {
            connection.query("SELECT employee.first_name, employee.last_name, role.title, CONCAT(person.first_name,' ', person.last_name) as manager FROM employee INNER JOIN role ON employee.role_id = role.id LEFT JOIN employee as person on employee.manager_id = person.id", function (err, res) {
                if (err) throw err;
                console.table(res);
                start();
            })
        }

![Organization Management System](assets/org_mgmt_system.gif)

## License
This project is licensed under the MIT license.

## Author
* Rebecca Eng
* [GitHub](https://github.com/engrebecca)
* [LinkedIn](https://www.linkedin.com/in/engrebecca/)
