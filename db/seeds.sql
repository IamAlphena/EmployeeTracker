USE employment_DB;

INSERT INTO department (id, dept_name)
VALUES (1, "Galactic Senate"),(2, "Other Alien"), (3, "Hawaiian");

INSERT INTO employeerole (id, role_name, salary, department_id)
VALUES (1, "Experiment", 500.00, 2), (2, "Exile", 700.00, 2), (3, "Hula Dancer", 500.00, 3), (4, "Surfer", 700.00, 3), (5, "Captain", 500.00, 1), (6, "Leader", 700.00, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Grand", "Councilwoman", 6, 0), (2, "Captain", "Gantu", 5, 1), (3, "Nani", "Pelekai", 4, 0), (4, "David", "Kawena", 4, 3), (5, "Lilo", "Pelekai", 3, 3), (6, "Jumba", "Jookiba", 2, 0), (7, "Wendy", "Pleakly", 2, 6), (8, "Stitch", "Pelekai", 1, 6);