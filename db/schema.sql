-- this will reset the tables
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

-- (2) Department table containing name and Id
CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);
-- (3)
--WHEN I choose to view all roles
-- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
-- (4 employee.js)

CREATE TABLE roles(
    --job title
    job_title VARCHAR(30) NOT NULL,
    --role_id
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    --role_department (foreign key from department's table)
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
    --role-salary
    role_salary DECIMAL (7,2),
    
);

CREATE TABLE manager (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(15),
    last_name VARCHAR(15)
);


CREATE TABLE employees (
    --id
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    --first name
    first_name VARCHAR(15) NOT NULL,
    --last name
    last_name VARCHAR(15) NOT NULL,
    --job title using foreign key from roles' table
    job_title VARCHAR(30) NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (job_title) REFERENCES roles(job_title),
    --department using foreign key from departments' table
    department INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (id) REFERENCES department(id),
    --salary from the roles' table
    salary INTEGER,
    CONSTRAINT fk_role FOREIGN KEY (role_salary) REFERENCES roles(role_salary),
    --manager id using foreign key from manager's table
    manager_id INTEGER,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES manager(id) ON DELETE SET NULL
);











