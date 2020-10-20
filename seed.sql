-- Insert values into department, role, and employee tables
INSERT INTO department (name)
VALUES ("Merchandising"), ("Marketing"), ("Planning"), ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Merchant", 110000, 1), ("Assistant Buyer", 72000, 1), ("Marketing Manager", 100000, 2), ("Marketing Coordinator", 60000, 2), ("Planner", 130000, 3), ("Planning Assistant", 82000, 3), ("Accounting Manager", 13500, 4), ("Accountant", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Miranda", "Priestly", 1), ("Sylvie", "Grateau", 3), ("Nigel", "Roberts", 5), ("Emily", "Olsen", 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andy", "Sachs", 2, 1), ("Emily", "Cooper", 4, 2), ("Serena", "Wood", 6, 3), ("Blair", "Wilson", 8, 4), ("Will", "Turner", 8, 4);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

