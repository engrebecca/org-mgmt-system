-- Create and use the company org database
DROP DATABASE IF EXISTS company_org_db;

CREATE DATABASE company_org_db;

USE company_org_db;

-- Create tables for department, role, and employee
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT
);

-- Insert values into department, role, and employee tables
INSERT INTO department (name)
VALUES ("Merchandising"), ("Marketing"), ("Planning"), ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Merchant", 110000, 1), ("Assistant Buyer", 72000, 1), ("Marketing Manager", 100000, 2), ("Marketing Coordinator", 60000, 2), ("Planner", 130000, 3), ("Planning Assistant", 82000, 3), ("Accounting Manager", 13500, 4), ("Accountant", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Miranda", "Priestly", 1), ("Sylvie", "Grateau", 3), ("Nigel", "Roberts", 5), ("Emily", "Olsen", 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andy", "Sachs", 2, 1), ("Emily", "Cooper", 4, 2), ("Serena", "Wood", 6, 3), ("Blair", "Wilson", 8, 4);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

