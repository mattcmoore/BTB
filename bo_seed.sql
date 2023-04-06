DROP TABLE IF EXISTS mcsps,tasks,users,messages;

CREATE TABLE mcsps(
    id SERIAL PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    code VARCHAR(255) NOT NULL,
    mcsp_name VARCHAR(255) NOT NULL
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    admin BOOLEAN NOT NULL,
    mcsp INTEGER,
    sep_date DATE,
    branch VARCHAR(255),
    family BOOLEAN,
    barracks BOOLEAN,
    FOREIGN KEY (mcsp) REFERENCES mcsps(id)

);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    complete BOOLEAN NOT NULL,
    complete_date DATE,
    due DATE NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    to_user INTEGER NOT NULL,
    from_user INTEGER NOT NULL,
    body VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    FOREIGN KEY (to_user) REFERENCES users(id),
    FOREIGN KEY (from_user) REFERENCES users(id)
);


INSERT INTO mcsps (start_date, end_date, code, mcsp_name) VALUES ( '2022-12-10', '2023-04-20', 'AAA1', 'MCSP-18');
INSERT INTO mcsps (start_date, end_date, code, mcsp_name) VALUES ( '2022-02-10', '2023-06-20', 'BBB2', 'MCSP-19');
INSERT INTO mcsps (start_date, end_date, code, mcsp_name) VALUES ( '2022-10-10', '2023-02-20', 'BAA3', 'MCSP-17');
INSERT INTO mcsps (start_date, end_date, code, mcsp_name) VALUES ( '2022-08-10', '2022-12-20', 'BBA4', 'MCSP-16');

INSERT INTO users (email, password, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('jrives@gmail.com', 'password123', 'Jullian Rives', true, NULL, NULL, NULL, NULL, NULL);
INSERT INTO users (email, password, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('emusk@tesla.com', 'password1234', 'Elon Musk', true, NULL, NULL, NULL, NULL, NULL);
INSERT INTO users (email, password, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('mariajohnson@example.com', 'P@ssw0rd123', 'Maria Johnson', false, 3, '2023-01-11', 'Airforce', true, false);
INSERT INTO users (email, password, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('davidlee@example.com', 'MyPassword1', 'David Lee', false, 1, '2023-01-11', 'Navy', false, true);
INSERT INTO users (email, password, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('emilydavis@example.com', 'SecretPass', 'Emily Davis', false, 1, '2023-01-11', 'Army', true, true);
INSERT INTO users (email, password, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('johnsmith@example.com', 'Password!1', 'John Smith', false, 1, '2023-01-11', 'Marine', false, false);
INSERT INTO users (email, password, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('sarahbrown@example.com', '123456Abc', 'Sarah Brown', false, 1, '2023-01-11', 'Coast Guard', true, false);
INSERT INTO users (email, password, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('jane.smith@example.com', 'p@ssword', 'Jane Smith', false, 2, '2023-01-05', 'Space Force', false, true);
INSERT INTO users (email, password, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('mike.brown@example.com', '12345abcde', 'Mike Brown', false, 3, '2023-01-07', 'Airforce', true, false);
INSERT INTO users (email, password, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('jack.wilson@example.com', 'mysecret', 'Jack Wilson', false, 1, '2023-02-10', 'Navy', true, false);
INSERT INTO users (email, password, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('susan.jackson@example.com', 'Pa$$w0rd', 'Susan Jackson', false, 1, '2023-01-01', 'Army', false, false);

INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('clear CIF', false, NULL, '2022-07-20', 1);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('clear CIF', false, NULL, '2022-09-05', 2);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('clear CIF', false, NULL, '2022-08-21', 3);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('clear CIF', false, NULL, '2022-08-13', 4);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('clear CIF', false, NULL, '2022-10-14', 5);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('clear unit', true, '2022-07-20', '2022-07-20', 1);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('clear unit', false, NULL, '2022-09-05', 2);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('clear unit', true, '2022-08-21', '2022-08-21', 3);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('clear unit', false, NULL, '2022-08-13', 4);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('clear unit', true, '2022-10-14', '2022-10-14', 5);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Sign DD-214', false, NULL, '2022-12-02', 4);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Submit leave request form', true, '2023-03-24', '2023-04-10', 6);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Complete training module', false, NULL, '2023-05-01', 5);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Submit leave request form', true, '2023-03-24', '2023-04-10', 10);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Attend medical check-up', true, '2023-02-22', '2023-03-10', 4);

INSERT INTO messages (to_user, from_user, body, date) VALUES ( 2, 1, 'Hello, do you have time to help me with an algorithm ?','2023-03-20');
INSERT INTO messages (to_user, from_user, body, date) VALUES ( 3, 1, 'u got plans this weekends ?','2023-02-15');
INSERT INTO messages (to_user, from_user, body, date) VALUES ( 4, 5, 'how did the job interview go ?','2023-01-10');
INSERT INTO messages (to_user, from_user, body, date) VALUES ( 5, 3, 'Hey, have you finished that project yet?', '2023-03-12');
INSERT INTO messages (to_user, from_user, body, date) VALUES ( 1, 2, 'I would be happy to help. Can we schedule a time?', '2023-03-21');
INSERT INTO messages (to_user, from_user, body, date) VALUES ( 3, 4, 'Did you hear about the new game that just came out?', '2023-02-20');
INSERT INTO messages (to_user, from_user, body, date) VALUES ( 2, 3, 'Can you recommend any good books on programming?', '2023-01-15');
INSERT INTO messages (to_user, from_user, body, date) VALUES ( 1, 4, 'How was your vacation? I hope you had a good time.', '2023-01-20');
INSERT INTO messages (to_user, from_user, body, date) VALUES ( 5, 2, 'Do you want to grab lunch this week?', '2023-02-05');