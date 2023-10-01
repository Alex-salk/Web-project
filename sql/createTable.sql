CREATE TABLE Universities (
	Id  SERIAL PRIMARY KEY,
	Name VARCHAR(255) NOT NULL
);
CREATE TABLE Groups (
    Id  SERIAL PRIMARY KEY,
    Name  VARCHAR(255) NOT NULL,
    UniversityId INTEGER REFERENCES Universities(Id)
);
CREATE TABLE Students (
	Id SERIAL PRIMARY KEY,
    FullName VARCHAR(255) NOT NULL,
    BirthDate timestamp  NOT NULL,
    GroupId INTEGER REFERENCES Groups(Id),
    AdmissionYear timestamp NOT NULL
);
CREATE TABLE Subjects  (
    Id  SERIAL PRIMARY KEY,
    Name  VARCHAR(255) NOT NULL
);
CREATE TABLE Grades (
    Id  SERIAL PRIMARY KEY,
    StudentId INTEGER REFERENCES Students(Id),
    SubjectId INTEGER REFERENCES Subjects(Id),
    Grade  INTEGER NOT NULL
);