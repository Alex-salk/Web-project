INSERT INTO  Universities (id, name) VALUES(1,'1 вуз');
INSERT INTO  Universities (id, name) VALUES(2,'2 вуз');
INSERT INTO  Universities (id, name) VALUES(3,'3 вуз');
INSERT INTO  Universities (id, name) VALUES(4,'4 вуз');

INSERT INTO Groups (id, name, universityId) VALUES (1, '1 предмет', 1);
INSERT INTO Groups (id, name, universityId) VALUES (2, '2 предмет', 2);
INSERT INTO Groups (id, name, universityId) VALUES (3, '3 предмет', 3);
INSERT INTO Groups (id, name, universityId) VALUES (4, '4 предмет', 4);

INSERT INTO Students (id, fullName, birthDate, groupId, admissionYear) VALUES (1, 'А А.А.', '12.06.2001', 2, '01.09.2020');
INSERT INTO Students (id, fullName, birthDate, groupId, admissionYear) VALUES (2, 'А А.Б.', '23.05.2002', 1, '01.09.2021');
INSERT INTO Students (id, fullName, birthDate, groupId, admissionYear) VALUES (3, 'А А.В.', '14.03.2003', 3, '01.09.2022');
INSERT INTO Students (id, fullName, birthDate, groupId, admissionYear) VALUES (4, 'А А.Г.', '12.12.2001', 4, '01.09.2021');
INSERT INTO Students (id, fullName, birthDate, groupId, admissionYear) VALUES (5, 'А А.Д.', '6.08.2000', 2, '01.09.2020');

INSERT INTO Subjects (id, name) VALUES (1, 'А');
INSERT INTO Subjects (id, name)  VALUES (2, 'Б');
INSERT INTO Subjects (id, name)  VALUES (3, 'В');
INSERT INTO Subjects (id, name)  VALUES (4, 'Г');

INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (1, 1, 1, 3);
INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (2, 1, 2, 3);
INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (3, 1, 3, 3);
INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (4, 1, 4, 4);
INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (5, 2, 1, 4);
INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (6, 2, 2, 4);
INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (7, 2, 3, 3);
INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (8, 2, 4, 3);
INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (9, 3, 1, 4);
INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (10, 3, 2, 4);
INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (11, 3, 3, 4);
INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (12, 3, 4, 4);
INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (13, 4, 1, 5);
INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (14, 4, 2, 4);
INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (15, 4, 3, 5);
INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (16, 4, 4, 5);
INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (17, 5, 1, 5);
INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (18, 5, 2, 5);
INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (19, 5, 3, 5);
INSERT INTO Grades ("Id", "StudentId", "SubjectId", "Grade") VALUES (20, 5, 4, 5);