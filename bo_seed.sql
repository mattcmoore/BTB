DROP TABLE IF EXISTS mcsps,tasks,users,messages,notes;

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
    date DATE NOT NULL,
    FOREIGN KEY (to_user) REFERENCES users(id),
    FOREIGN KEY (from_user) REFERENCES users(id)
);

CREATE TABLE notes(
    id SERIAL PRIMARY KEY,
    body VARCHAR(300) NOT NULL,
    date TEXT NOT NULL,
    author INTEGER NOT NULL,
    FOREIGN KEY (author) REFERENCES users(id)
);


INSERT INTO mcsps (start_date, end_date, code, mcsp_name) VALUES ( '2022-12-10', '2023-04-20', 'AAA1', 'MCSP-18');
INSERT INTO mcsps (start_date, end_date, code, mcsp_name) VALUES ( '2022-02-10', '2023-06-20', 'BBB2', 'MCSP-19');
INSERT INTO mcsps (start_date, end_date, code, mcsp_name) VALUES ( '2022-10-10', '2023-02-20', 'BAA3', 'MCSP-17');
INSERT INTO mcsps (start_date, end_date, code, mcsp_name) VALUES ( '2022-08-10', '2022-12-20', 'BBA4', 'MCSP-16');

INSERT INTO users (email, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('jrives@gmail.com', 'Jullian Rives', true, NULL, NULL, NULL, NULL, NULL);
INSERT INTO users (email, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('emusk@tesla.com', 'Elon Musk', true, NULL, NULL, NULL, NULL, NULL);
INSERT INTO users (email, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('garrett@gman.com', 'Garrett Ross', true, NULL, NULL, NULL, NULL, NULL);
INSERT INTO users (email, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('mariajohnson@example.com', 'Maria Johnson', false, 3, '2023-01-11', 'Airforce', true, false);
INSERT INTO users (email, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('davidlee@example.com', 'David Lee', false, 1, '2023-01-11', 'Navy', false, true);
INSERT INTO users (email, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('emilydavis@example.com', 'Emily Davis', false, 1, '2023-01-11', 'Army', true, true);
INSERT INTO users (email, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('johnsmith@example.com', 'John Smith', false, 1, '2023-01-11', 'Marine', false, false);
INSERT INTO users (email, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('sarahbrown@example.com', 'Sarah Brown', false, 1, '2023-01-11', 'Coast Guard', true, false);
INSERT INTO users (email, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('jane.smith@example.com', 'Jane Smith', false, 2, '2023-01-05', 'Space Force', false, true);
INSERT INTO users (email, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('mike.brown@example.com', 'Mike Brown', false, 3, '2023-01-07', 'Airforce', true, false);
INSERT INTO users (email, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('jack.wilson@example.com', 'Jack Wilson', false, 1, '2023-02-10', 'Navy', true, false);
INSERT INTO users (email, name, admin, mcsp, sep_date, branch, family, barracks) VALUES ('susan.jackson@example.com', 'Susan Jackson', false, 1, '2023-01-01', 'Army', false, false);

INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Prepare transition leave documents', true, NULL, '2022-07-20', 9);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Arrange transportation and household goods', false, NULL, '2022-09-05', 9);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Review/update/acquire LES, SGLI, Certifications, and other relevant documents', false, NULL, '2022-08-21', 9);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Schedule Separation Physical', false, NULL, '2022-08-13', 9);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Clean and account for gear, schedule turn-in', false, NULL, '2022-10-14', 9);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Obtain copies of medical records', true, '2022-07-20', '2022-07-20', 9);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Meet with Service Retirement Officer (retirees only)', false, NULL, '2022-09-05', 9);

INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Attend out-processing brief', true, '2022-08-21', '2022-08-21', 4);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Submit transition leave form', false, NULL, '2022-08-13', 4);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Obtain copies of medical and dental records', true, '2022-10-14', '2022-10-14', 4);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Complete Separation physical and Separation Dental Exam', false, NULL, '2022-12-02', 4);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Obtain separation orders', true, '2023-03-24', '2023-04-10', 4);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Research VA insurance coverage and benefits', false, NULL, '2023-05-01', 4);

INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Obtain separation orders and make at least 15 copies for distribution', true, '2023-03-24', '2023-04-10', 5);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Clothing record final review and turn-in', true, '2023-02-22', '2023-03-10', 5);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('If taking leave, begin clearing the installation', true, '2023-02-22', '2023-03-10', 5);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Finalize relocation appointments (if applicable)', true, '2023-02-22', '2023-03-10', 5);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Review benefits', true, '2023-02-22', '2023-03-10', 5);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Begin preparations for disability claim (if applicable)', true, '2023-02-22', '2023-03-10', 5);

INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Review military records', true, '2023-02-22', '2023-03-10', 6);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('If not taking leave, begin clearing installation', true, '2023-02-22', '2023-03-10', 6);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Gear/CIF turn-in', true, '2023-02-22', '2023-03-10', 6);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Finalize medical processes on post', true, '2023-02-22', '2023-03-10', 6);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Review your disability claim (if applicable)', true, '2023-02-22', '2023-03-10', 6);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Review your plan for life after the military', true, '2023-02-22', '2023-03-10', 6);

INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Finalize unit clearing', true, '2023-02-22', '2023-03-10', 7);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Finalize installation clearing', true, '2023-02-22', '2023-03-10', 7);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Sign and obtain DD-214, store in a safe location', true, '2023-02-22', '2023-03-10', 7);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Establish your local VA centers (emergency and clinic)', true, '2023-02-22', '2023-03-10', 7);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Communicate ETS ceremony with your unit', true, '2023-02-22', '2023-03-10', 7);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Communicate with local VSO', true, '2023-02-22', '2023-03-10', 7);
INSERT INTO tasks (task, complete, complete_date, due, user_id) VALUES ('Contact VA for benefits enrollment/verification', true, '2023-02-22', '2023-03-10', 7);

INSERT INTO messages (to_user, from_user, body, date) VALUES ( 2, 1, 'Hello, do you have time to help me with an algorithm ?','2023-03-20');
INSERT INTO messages (to_user, from_user, body, date) VALUES ( 3, 1, 'u got plans this weekends ?','2023-02-15');
INSERT INTO messages (to_user, from_user, body, date) VALUES ( 4, 5, 'how did the job interview go ?','2023-01-10');
INSERT INTO messages (to_user, from_user, body, date) VALUES ( 5, 3, 'Hey, have you finished that project yet?', '2023-03-12');
INSERT INTO messages (to_user, from_user, body, date) VALUES ( 1, 2, 'Hi, thanks for offering to help with the algorithm. Can we schedule a time?', '2023-03-21');
INSERT INTO messages (to_user, from_user, body, date) VALUES ( 3, 4, 'Did you hear about the new game that just came out?', '2023-02-20');
INSERT INTO messages (to_user, from_user, body, date) VALUES ( 2, 3, 'Can you recommend any good books on programming?', '2023-01-15');
INSERT INTO messages (to_user, from_user, body, date) VALUES ( 2, 4, 'How was your vacation? I hope you had a good time.', '2023-01-20');
INSERT INTO messages (to_user, from_user, body, date) VALUES ( 5, 2, 'Do you want to grab lunch this week?', '2023-02-05');

-- INSERT INTO notes (body, date, author) VALUES ('Gotta layout and clean my gear before turn in. Will take about a week.', '03/21/2023', 3);
-- INSERT INTO notes (body, date, author) VALUES ('Need to contact my S1 so I can see if my separation orders have been created yet. I also need to contact my S2 shop to see if I can get read off.', '02/19/2023', 3);

