PRAGMA foreign_keys = ON;

-- university
CREATE TABLE IF NOT EXISTS University (
    Uni_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    Uni_Name    TEXT    NOT NULL,
    Uni_PhnNumb TEXT,
    Uni_Email   TEXT    UNIQUE
);

-- student
CREATE TABLE IF NOT EXISTS Student (
    Stu_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    Stu_Name    TEXT    NOT NULL,
    Stu_Age     INTEGER CHECK (Stu_Age >= 16 AND Stu_Age <= 100),
    Stu_JobExp  TEXT,
    Stu_GPA     REAL    CHECK (Stu_GPA >= 0.0 AND Stu_GPA <= 4.0),
    Stu_Major   TEXT,
    Stu_Courses TEXT,
    Stu_GradYr  INTEGER,
    Stu_PhnNumb TEXT,
    Stu_Email   TEXT    NOT NULL UNIQUE,
    Uni_id      INTEGER NOT NULL REFERENCES University(Uni_id)
);

-- company
CREATE TABLE IF NOT EXISTS Company (
    Cmp_id          INTEGER PRIMARY KEY AUTOINCREMENT,
    Cmp_Name        TEXT    NOT NULL,
    Cmp_Requirement TEXT,
    Cmp_PhnNumb     TEXT,
    Cmp_Email       TEXT    UNIQUE
);

-- job
CREATE TABLE IF NOT EXISTS Job (
    Job_id       INTEGER PRIMARY KEY AUTOINCREMENT,
    Job_Title    TEXT    NOT NULL,
    Job_Desc     TEXT,
    Job_Location TEXT,
    Job_Type     TEXT,
    Job_Category TEXT,
    Cmp_id       INTEGER NOT NULL REFERENCES Company(Cmp_id) ON DELETE CASCADE
);

-- application
CREATE TABLE IF NOT EXISTS Application (
    App_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    Stu_id      INTEGER NOT NULL REFERENCES Student(Stu_id) ON DELETE CASCADE,
    Cmp_id      INTEGER NOT NULL REFERENCES Company(Cmp_id) ON DELETE CASCADE,
    App_Date    TEXT    NOT NULL DEFAULT (datetime('now')),
    App_Status  TEXT    NOT NULL DEFAULT 'applied'
                        CHECK (App_Status IN ('applied', 'reviewing', 'accepted', 'rejected')),
    UNIQUE (Stu_id, Cmp_id)
);
