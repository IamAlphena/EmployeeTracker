DROP DATABASE IF EXISTS employment_DB;
CREATE DATABASE employment_DB;

USE employment_DB;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT default 0 NOT NULL,
  manager_id INT default 0,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employeerole (
  id INT NOT NULL AUTO_INCREMENT,
  role_name VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL, 
  department_id INT NOT NULL
  PRIMARY KEY (id)
);



SELECT * FROM department;
SELECT * FROM employee;
SELECT * FROM employeerole;

SELECT first_name, last_name, role_name
FROM employee INNER JOIN employeerole
ON employee.role_id = employeerole.id;

SELECT role_name, dept_name
FROM employeerole INNER JOIN department
ON employeerole.department_id = department.id;

