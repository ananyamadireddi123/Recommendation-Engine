-- creating a database if not created
create database if not exists DASS_Project;
use DASS_Project;

-- creating table for courses
CREATE TABLE if not exists COURSES (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(100)
);

-- creating table for modules
CREATE TABLE if not exists MODULES (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    module_name VARCHAR(100)
);

-- creating table for subskills
CREATE TABLE if not exists SUBSKILLS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    subskill_name VARCHAR(100)
);

-- creating table for skilltopics
CREATE TABLE if not exists SKILLTOPICS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    skilltopic_name VARCHAR(100)
);

-- creating link between courses and modules
CREATE TABLE IF NOT EXISTS COURSE_MODULE_LINK (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    course_ID INT,
    module_ID INT,
    module_number INT,
    FOREIGN KEY (course_ID) REFERENCES COURSES(ID) ON DELETE CASCADE,
    FOREIGN KEY (module_ID) REFERENCES MODULES(ID) ON DELETE CASCADE,
    UNIQUE KEY (course_ID, module_ID)
);

-- creating link between modules and subskills
CREATE TABLE IF NOT EXISTS MODULE_SUBSKILL_LINK (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    module_ID INT,
    subskill_ID INT,
    subskill_number INT,
    FOREIGN KEY (module_ID) REFERENCES MODULES(ID) ON DELETE CASCADE,
    FOREIGN KEY (subskill_ID) REFERENCES SUBSKILLS(ID) ON DELETE CASCADE,
    UNIQUE KEY (module_ID, subskill_ID)
);

-- creating link between subskills and skilltopics
CREATE TABLE IF NOT EXISTS SUBSKILL_SKILLTOPIC_LINK (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    subskill_ID INT,
    skilltopic_ID INT,
    skilltopic_number INT,
    FOREIGN KEY (subskill_ID) REFERENCES SUBSKILLS(ID) ON DELETE CASCADE,
    FOREIGN KEY (skilltopic_ID) REFERENCES SKILLTOPICS(ID) ON DELETE CASCADE,
    UNIQUE KEY (subskill_ID, skilltopic_ID)
);

-- creating table for exercises
CREATE TABLE if not exists EXERCISES (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ex_type varchar(100),
    ex_time INT,
    ex_category INT,
    ex_sub_category INT,
    ex_level INT
);

-- creating table for exercise data linked from EXERCISES
CREATE TABLE if not exists EXERCISE_DATA (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ex_ID INT,
    ex_key text,
    ex_value text,
    FOREIGN KEY (ex_ID) REFERENCES EXERCISES(ID) ON DELETE CASCADE
);

-- creating tags table 
-- stores types of tagging
create table if not exists TAGS(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    tag_type varchar(100)
);

-- creating table for tag values connecting from tags
CREATE TABLE if not exists TAG_VALUES (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    tag_ID INT, -- TAGS(ID)
    tag_value VARCHAR(100), -- actual string which has the name of the tag
    FOREIGN KEY (tag_ID) REFERENCES TAGS(ID) ON DELETE CASCADE
);

-- creating link between exercises and tags
CREATE TABLE IF NOT EXISTS EXERCISE_TAG_LINK (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ex_ID INT,
    tag_ID INT, -- TAGS(ID)
    tag_ref INT, -- TAG_VALUES(ID)
    FOREIGN KEY (ex_ID) REFERENCES EXERCISES(ID) ON DELETE CASCADE,
    FOREIGN KEY (tag_ID) REFERENCES TAGS(ID) ON DELETE CASCADE,
    FOREIGN KEY (tag_ref) REFERENCES TAG_VALUES(ID) ON DELETE CASCAdE,
    UNIQUE KEY (ex_ID, tag_ID)
);


CREATE TABLE if not exists EXAM_TEMPLATES (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    parent_type VARCHAR(100),
    parent_ID INT,
    type VARCHAR(100),
    pass_percentage FLOAT,
    group_by VARCHAR(100),
    FOREIGN KEY (parent_ID) REFERENCES COURSES(ID) ON DELETE CASCADE
);

CREATE TABLE if not exists EXAM_TEMPLATES_INFO (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Template_ID INT,
    section_Name VARCHAR(100),
    Allowed_Question_Types TEXT,
    min_time INT,
    max_time INT,
    pass_percentage FLOAT,
    allowed_levels VARCHAR(100),
    level_distribution JSON,
    FOREIGN KEY (Template_ID) REFERENCES EXAM_TEMPLATES(ID) ON DELETE CASCADE
);

-- CREATE TABLE if not exists EXERCISES_IN_EXAM(
--     ID INT PRIMARY KEY AUTO_INCREMENT,
--     Template_ID INT,
--     Exercise_ID INT,
--     FOREIGN KEY (Template_ID) REFERENCES EXAM_TEMPLATES(ID) ON DELETE CASCADE,
--     FOREIGN KEY (Exercise_ID) REFERENCES EXERCISE_DATA(ID) ON DELETE CASCADE
-- );

CREATE TABLE if not exists USERS_PROGRESS(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    User_Id INT,
    Current_Course_ID INT,
    Current_Module_ID INT,
    Current_Subskill_ID INT,
    Current_Skilltopic_ID INT,
    FOREIGN KEY (Current_Course_ID) REFERENCES COURSES(ID) ON DELETE CASCADE,
    FOREIGN KEY (Current_Module_ID) REFERENCES MODULES(ID) ON DELETE CASCADE,
    FOREIGN KEY (Current_Subskill_ID) REFERENCES SUBSKILLS(ID) ON DELETE CASCADE,
    FOREIGN KEY (Current_Skilltopic_ID) REFERENCES SKILLTOPICS(ID) ON DELETE CASCADE
);