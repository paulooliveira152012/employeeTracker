INSERT INTO departments (name)
VALUES
    ("Management"),
    ("IT support"),
    ("Sales");

INSERT INTO roles (job_title, role_salary, department_id)
VALUES
    ("Manager", 10000, 1),
    ("Softwer engineer", 90000, 2),
    ("Sales Person", 70000, 3);

INSERT INTO manager (first_name, last_name)
VALUES 
    ('Frank', 'Smith');


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Ronald', 'Firbank', 1, NULL),
    ('Virginia', 'Woolf', 2, 1),
    ('Piers', 'Gaveston', 3, 1);


