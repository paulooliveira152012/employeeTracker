DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS manager;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) 
);

CREATE TABLE roles(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    role_salary DECIMAL (7,2)
);

CREATE TABLE manager (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(15),
    last_name VARCHAR(15)
);


CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(15) NOT NULL,
    last_name VARCHAR(15) NOT NULL,
    role_id INTEGER NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id),
    department VARCHAR,
    CONSTRAINT fk_dept FOREIGN KEY (name) REFERENCES departments(name),
    manager_id INTEGER,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES manager(id) ON DELETE SET NULL
);

