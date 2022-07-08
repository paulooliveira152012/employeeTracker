INSERT INTO departments (name)
VALUES
    ("Management"),
    ("IT support"),
    ("Engineering");


INSERT INTO roles (job_title, role_id, department_id, role_salary)
VALUES
    ("Manager", 1, 1, 70000),
    ("Softwer engineer", 2, 3, 90000),
    ("Engineer", 3, 3, 70000);

INSERT INTO manager (first_name, last_name)
VALUES 
    ('Frank', 'Smith'),
    ('Charl', 'Johnson');



INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Ronald', 'Firbank', 1, 2),
    ('Virginia', 'Woolf', 2, 1),
    ('Piers', 'Gaveston', 3, 1);


