    -- contains sample data
     
    -- Inserting 5 courses into the COURSES table in one call
    INSERT INTO COURSES (course_name) VALUES 
    ('Mathematics'),
    ('Physics'),
    ('Biology'),
    ('Chemistry'),
    ('Literature');
     
    -- Inserting modules into the MODULES table for each course with shorter names
    INSERT INTO MODULES (module_name) VALUES 
    ('Mod 1 Math'),
    ('Mod 2 Math'),
    ('Mod 3 Math');
     
    INSERT INTO MODULES (module_name) VALUES 
    ('Mod 1 Physics'),
    ('Mod 2 Physics'),
    ('Mod 3 Physics');
     
    INSERT INTO MODULES (module_name) VALUES 
    ('Mod 1 Biology'),
    ('Mod 2 Biology'),
    ('Mod 3 Biology');
     
    INSERT INTO MODULES (module_name) VALUES 
    ('Mod 1 Chem'),
    ('Mod 2 Chem'),
    ('Mod 3 Chem');
     
    INSERT INTO MODULES (module_name) VALUES 
    ('Mod 1 Lit'),
    ('Mod 2 Lit'),
    ('Mod 3 Lit');
     
    -- Inserting values into the COURSE_MODULE_LINK table
    INSERT INTO COURSE_MODULE_LINK (course_ID, module_ID, module_number) VALUES
    (1, 1, 1), -- Math: Mod 1
    (1, 2, 2), -- Math: Mod 2
    (1, 3, 3), -- Math: Mod 3
     
    (2, 4, 1), -- Physics: Mod 1
    (2, 5, 2), -- Physics: Mod 2
    (2, 6, 3), -- Physics: Mod 3
     
    (3, 7, 1), -- Biology: Mod 1
    (3, 8, 2), -- Biology: Mod 2
    (3, 9, 3), -- Biology: Mod 3
     
    (4, 10, 1), -- Chem: Mod 1
    (4, 11, 2), -- Chem: Mod 2
    (4, 12, 3), -- Chem: Mod 3
     
    (5, 13, 1), -- Lit: Mod 1
    (5, 14, 2), -- Lit: Mod 2
    (5, 15, 3); -- Lit: Mod 3
     
    -- Inserting subskills for each Math module
    INSERT INTO SUBSKILLS (subskill_name) VALUES
    ('Algebra I'),
    ('Geometry I'),
    ('Trigonometry I');
     
    INSERT INTO SUBSKILLS (subskill_name) VALUES
    ('Algebra II'),
    ('Geometry II'),
    ('Trigonometry II');
     
    INSERT INTO SUBSKILLS (subskill_name) VALUES
    ('Calculus I'),
    ('Calculus II'),
    ('Calculus III');
     
    -- Inserting links between modules and subskills for Mathematics
    INSERT INTO MODULE_SUBSKILL_LINK (module_ID, subskill_ID, subskill_number) VALUES
    (1, 1, 1), -- Module 1: Algebra I
    (1, 2, 2), -- Module 1: Geometry I
    (1, 3, 3), -- Module 1: Trigonometry I
     
    (2, 4, 1), -- Module 2: Algebra II
    (2, 5, 2), -- Module 2: Geometry II
    (2, 6, 3), -- Module 2: Trigonometry II
     
    (3, 7, 1), -- Module 3: Calculus I
    (3, 8, 2), -- Module 3: Calculus II
    (3, 9, 3); -- Module 3: Calculus III
     
    -- Inserting skill topics for each subskill made for math
    -- Algebra I Subskills
    INSERT INTO SKILLTOPICS (skilltopic_name) VALUES
    ('Solving Linear Equations'),
    ('Graphing Linear Equations'),
    ('Systems of Linear Equations');
     
    -- Geometry I Subskills
    INSERT INTO SKILLTOPICS (skilltopic_name) VALUES
    ('Properties of Triangles'),
    ('Properties of Quadrilaterals'),
    ('Circle Theorems');
     
    -- Trigonometry I Subskills
    INSERT INTO SKILLTOPICS (skilltopic_name) VALUES
    ('Trigonometric Identities'),
    ('Trigonometric Functions and Graphs'),
    ('Solving Trigonometric Equations');
     
    -- Algebra II Subskills
    INSERT INTO SKILLTOPICS (skilltopic_name) VALUES
    ('Quadratic Functions and Equations'),
    ('Polynomial Functions'),
    ('Exponential and Logarithmic Functions');
     
    -- Geometry II Subskills
    INSERT INTO SKILLTOPICS (skilltopic_name) VALUES
    ('Area and Perimeter of Polygons'),
    ('Volume and Surface Area of Solids'),
    ('Transformations and Symmetry');
     
    -- Trigonometry II Subskills
    INSERT INTO SKILLTOPICS (skilltopic_name) VALUES
    ('Law of Sines and Cosines'),
    ('Vectors in the Plane'),
    ('Polar Coordinates');
     
    -- Calculus I Subskills
    INSERT INTO SKILLTOPICS (skilltopic_name) VALUES
    ('Limits and Continuity'),
    ('Derivatives of Functions'),
    ('Applications of Differentiation');
     
    -- Calculus II Subskills
    INSERT INTO SKILLTOPICS (skilltopic_name) VALUES
    ('Integration Techniques'),
    ('Applications of Integration'),
    ('Sequences and Series');
     
    -- Calculus III Subskills
    INSERT INTO SKILLTOPICS (skilltopic_name) VALUES
    ('Parametric Equations and Polar Coordinates'),
    ('Vector-Valued Functions'),
    ('Partial Derivatives and Multiple Integrals');
     
    -- Inserting links between subskills and skill topics
    -- Algebra I Subskills
    INSERT INTO SUBSKILL_SKILLTOPIC_LINK (subskill_ID, skilltopic_ID, skilltopic_number) VALUES
    (1, 1, 1), -- Algebra I: Solving Linear Equations
    (1, 2, 2), -- Algebra I: Graphing Linear Equations
    (1, 3, 3), -- Algebra I: Systems of Linear Equations
     
    -- Geometry I Subskills
    (2, 4, 1), -- Geometry I: Properties of Triangles
    (2, 5, 2), -- Geometry I: Properties of Quadrilaterals
    (2, 6, 3), -- Geometry I: Circle Theorems
     
    -- Trigonometry I Subskills
    (3, 7, 1), -- Trigonometry I: Trigonometric Identities
    (3, 8, 2), -- Trigonometry I: Trigonometric Functions and Graphs
    (3, 9, 3), -- Trigonometry I: Solving Trigonometric Equations
     
    -- Algebra II Subskills
    (4, 10, 1), -- Algebra II: Quadratic Functions and Equations
    (4, 11, 2), -- Algebra II: Polynomial Functions
    (4, 12, 3), -- Algebra II: Exponential and Logarithmic Functions
     
    -- Geometry II Subskills
    (5, 13, 1), -- Geometry II: Area and Perimeter of Polygons
    (5, 14, 2), -- Geometry II: Volume and Surface Area of Solids
    (5, 15, 3), -- Geometry II: Transformations and Symmetry
     
    -- Trigonometry II Subskills
    (6, 16, 1), -- Trigonometry II: Law of Sines and Cosines
    (6, 17, 2), -- Trigonometry II: Vectors in the Plane
    (6, 18, 3), -- Trigonometry II: Polar Coordinates
     
    -- Calculus I Subskills
    (7, 19, 1), -- Calculus I: Limits and Continuity
    (7, 20, 2), -- Calculus I: Derivatives of Functions
    (7, 21, 3), -- Calculus I: Applications of Differentiation
     
    -- Calculus II Subskills
    (8, 22, 1), -- Calculus II: Integration Techniques
    (8, 23, 2), -- Calculus II: Applications of Integration
    (8, 24, 3), -- Calculus II: Sequences and Series
     
    -- Calculus III Subskills
    (9, 25, 1), -- Calculus III: Parametric Equations and Polar Coordinates
    (9, 26, 2), -- Calculus III: Vector-Valued Functions
    (9, 27, 3); -- Calculus III: Partial Derivatives and Multiple Integrals
     
     
    -- List down all the tag types
    INSERT INTO TAGS (tag_type) VALUES
    ('COURSE'),
    ('MODULE'),
    ('SUBSKILL'),
    ('SKILLTOPIC'),
    ('APPLICATION');
     
     
    -- Populating the EXERCISES table with a total of 50 data points and ordering by exercise type
    INSERT INTO EXERCISES (ex_type, ex_time, ex_category, ex_sub_category, ex_level)
    VALUES
    -- MCQs
    -- ss1
    ('MCQ', 12, NULL, NULL, 1),
    ('MCQ', 8, NULL, NULL, 2),
    ('MCQ', 15, NULL, NULL, 3),
    ('MCQ', 5, NULL, NULL, 4),
    ('MCQ', 19, NULL, NULL, 1),
    ('MCQ', 11, NULL, NULL, 2),
    ('MCQ', 7, NULL, NULL, 3),
    ('MCQ', 18, NULL, NULL, 4),
    ('MCQ', 10, NULL, NULL, 1),
    ('MCQ', 14, NULL, NULL, 2),
    ('MCQ', 6, NULL, NULL, 3),
    ('MCQ', 17, NULL, NULL, 4),
    ('MCQ', 4, NULL, NULL, 1),
    ('MCQ', 13, NULL, NULL, 2),
    ('MCQ', 9, NULL, NULL, 3),
    ('MCQ', 16, NULL, NULL, 4),
    ('MCQ', 3, NULL, NULL, 1),
    ('MCQ', 20, NULL, NULL, 2),
    ('MCQ', 7, NULL, NULL, 3),
    ('MCQ', 5, NULL, NULL, 4),
    -- ss2
    ('MCQ', 9, NULL, NULL, 1),
    ('MCQ', 4, NULL, NULL, 2),
    ('MCQ', 6, NULL, NULL, 3),
    ('MCQ', 8, NULL, NULL, 4),
    ('MCQ', 3, NULL, NULL, 1),
    ('MCQ', 10, NULL, NULL, 2),
    ('MCQ', 2, NULL, NULL, 3),
    ('MCQ', 18, NULL, NULL, 4),
    ('MCQ', 8, NULL, NULL, 1),
    ('MCQ', 15, NULL, NULL, 2),
    ('MCQ', 5, NULL, NULL, 3),
    ('MCQ', 19, NULL, NULL, 4),
    ('MCQ', 11, NULL, NULL, 1),
    ('MCQ', 7, NULL, NULL, 2),
    ('MCQ', 18, NULL, NULL, 3),
    ('MCQ', 10, NULL, NULL, 4),
    ('MCQ', 14, NULL, NULL, 1),
    ('MCQ', 6, NULL, NULL, 2),
    ('MCQ', 17, NULL, NULL, 3),
    ('MCQ', 4, NULL, NULL, 4),
    -- ss3
    ('MCQ', 13, NULL, NULL, 1),
    ('MCQ', 9, NULL, NULL, 2),
    ('MCQ', 16, NULL, NULL, 3),
    ('MCQ', 3, NULL, NULL, 4),
    ('MCQ', 20, NULL, NULL, 1),
    ('MCQ', 21, NULL, NULL, 2),
    ('MCQ', 7, NULL, NULL, 3),
    ('MCQ', 5, NULL, NULL, 4),
    ('MCQ', 9, NULL, NULL, 1),
    ('MCQ', 4, NULL, NULL, 2),
    ('MCQ', 6, NULL, NULL, 3),
    ('MCQ', 8, NULL, NULL, 4),
    ('MCQ', 3, NULL, NULL, 1),
    ('MCQ', 10, NULL, NULL, 2),
    ('MCQ', 18, NULL, NULL, 3),
    ('MCQ', 8, NULL, NULL, 4),
    ('MCQ', 15, NULL, NULL, 1),
    ('MCQ', 5, NULL, NULL, 2),
    ('MCQ', 19, NULL, NULL, 3),
    ('MCQ', 11, NULL, NULL, 4),
    -- ss4
    ('MCQ', 7, NULL, NULL, 1),
    ('MCQ', 18, NULL, NULL, 2),
    ('MCQ', 10, NULL, NULL, 3),
    ('MCQ', 14, NULL, NULL, 4),
    ('MCQ', 6, NULL, NULL, 1),
    ('MCQ', 17, NULL, NULL, 2),
    ('MCQ', 4, NULL, NULL, 3),
    ('MCQ', 13, NULL, NULL, 4),
    ('MCQ', 9, NULL, NULL, 1),
    ('MCQ', 16, NULL, NULL, 2),
    ('MCQ', 3, NULL, NULL, 3),
    ('MCQ', 20, NULL, NULL, 4)
    ('MCQ', 12, NULL, NULL, 1),
    ('MCQ', 8, NULL, NULL, 2),
    ('MCQ', 15, NULL, NULL, 3),
    ('MCQ', 5, NULL, NULL, 4),
    ('MCQ', 19, NULL, NULL, 1),
    ('MCQ', 11, NULL, NULL, 2),
    ('MCQ', 7, NULL, NULL, 3),
    ('MCQ', 18, NULL, NULL, 4),
    -- ss5
    ('MCQ', 10, NULL, NULL, 1),
    ('MCQ', 14, NULL, NULL, 2),
    ('MCQ', 6, NULL, NULL, 3),
    ('MCQ', 17, NULL, NULL, 4),
    ('MCQ', 4, NULL, NULL, 1),
    ('MCQ', 13, NULL, NULL, 2),
    ('MCQ', 9, NULL, NULL, 3),
    ('MCQ', 16, NULL, NULL, 4),
    ('MCQ', 3, NULL, NULL, 1),
    ('MCQ', 20, NULL, NULL, 2),
    ('MCQ', 7, NULL, NULL, 3),
    ('MCQ', 5, NULL, NULL, 4),
    ('MCQ', 9, NULL, NULL, 1),
    ('MCQ', 4, NULL, NULL, 2),
    ('MCQ', 6, NULL, NULL, 3),
    ('MCQ', 8, NULL, NULL, 4),
    ('MCQ', 3, NULL, NULL, 1),
    ('MCQ', 10, NULL, NULL, 2),
    ('MCQ', 2, NULL, NULL, 3),
    -- ss6
    ('MCQ', 18, NULL, NULL, 4),
    ('MCQ', 8, NULL, NULL, 1),
    ('MCQ', 15, NULL, NULL, 2),
    ('MCQ', 5, NULL, NULL, 3),
    ('MCQ', 19, NULL, NULL, 4),
    ('MCQ', 11, NULL, NULL, 1),
    ('MCQ', 7, NULL, NULL, 2),
    ('MCQ', 18, NULL, NULL, 3),
    ('MCQ', 10, NULL, NULL, 4),
    ('MCQ', 14, NULL, NULL, 1),
    ('MCQ', 6, NULL, NULL, 2),
    ('MCQ', 17, NULL, NULL, 3),
    ('MCQ', 4, NULL, NULL, 4),
    ('MCQ', 13, NULL, NULL, 1),
    ('MCQ', 9, NULL, NULL, 2),
    ('MCQ', 16, NULL, NULL, 3),
    ('MCQ', 3, NULL, NULL, 4),
    ('MCQ', 20, NULL, NULL, 1),
    ('MCQ', 21, NULL, NULL, 2),
    ('MCQ', 7, NULL, NULL, 3),
    -- ss7
    ('MCQ', 5, NULL, NULL, 4),
    ('MCQ', 9, NULL, NULL, 1),
    ('MCQ', 4, NULL, NULL, 2),
    ('MCQ', 6, NULL, NULL, 3),
    ('MCQ', 8, NULL, NULL, 4),
    ('MCQ', 3, NULL, NULL, 1),
    ('MCQ', 10, NULL, NULL, 2),
    ('MCQ', 18, NULL, NULL, 3),
    ('MCQ', 8, NULL, NULL, 4),
    ('MCQ', 15, NULL, NULL, 1),
    ('MCQ', 5, NULL, NULL, 2),
    ('MCQ', 19, NULL, NULL, 3),
    ('MCQ', 11, NULL, NULL, 4),
    ('MCQ', 7, NULL, NULL, 1),
    ('MCQ', 18, NULL, NULL, 2),
    ('MCQ', 10, NULL, NULL, 3),
    ('MCQ', 14, NULL, NULL, 4),
    ('MCQ', 6, NULL, NULL, 1),
    ('MCQ', 17, NULL, NULL, 2),
    ('MCQ', 4, NULL, NULL, 3),
    -- ss8
    ('MCQ', 13, NULL, NULL, 4),
    ('MCQ', 9, NULL, NULL, 1),
    ('MCQ', 16, NULL, NULL, 2),
    ('MCQ', 3, NULL, NULL, 3),
    ('MCQ', 20, NULL, NULL, 4),
    ('MCQ', 12, NULL, NULL, 1),
    ('MCQ', 8, NULL, NULL, 2),
    ('MCQ', 15, NULL, NULL, 3),
    ('MCQ', 5, NULL, NULL, 4),
    ('MCQ', 19, NULL, NULL, 1),
    ('MCQ', 11, NULL, NULL, 2),
    ('MCQ', 7, NULL, NULL, 3),
    ('MCQ', 18, NULL, NULL, 4),
    ('MCQ', 10, NULL, NULL, 1),
    ('MCQ', 14, NULL, NULL, 2),
    ('MCQ', 6, NULL, NULL, 3),
    ('MCQ', 17, NULL, NULL, 4),
    ('MCQ', 4, NULL, NULL, 1),
    ('MCQ', 13, NULL, NULL, 2),
    -- ss9
    ('MCQ', 9, NULL, NULL, 3),
    ('MCQ', 16, NULL, NULL, 4),
    ('MCQ', 3, NULL, NULL, 1),
    ('MCQ', 20, NULL, NULL, 2),
    ('MCQ', 7, NULL, NULL, 3),
    ('MCQ', 5, NULL, NULL, 4),
    ('MCQ', 9, NULL, NULL, 1),
    ('MCQ', 4, NULL, NULL, 2),
    ('MCQ', 6, NULL, NULL, 3),
    ('MCQ', 8, NULL, NULL, 4),
    ('MCQ', 3, NULL, NULL, 1),
    ('MCQ', 10, NULL, NULL, 2),
    ('MCQ', 2, NULL, NULL, 3),
    ('MCQ', 18, NULL, NULL, 4),
    ('MCQ', 8, NULL, NULL, 1),
    ('MCQ', 15, NULL, NULL, 2),
    ('MCQ', 5, NULL, NULL, 3),
    ('MCQ', 19, NULL, NULL, 4),
    ('MCQ', 11, NULL, NULL, 1),
    ('MCQ', 7, NULL, NULL, 2),
    ('MCQ', 18, NULL, NULL, 3),
    ('MCQ', 10, NULL, NULL, 4)
     
    -- Integers
    ('Integer', 15, NULL, NULL, 2),
    ('Integer', 7, NULL, NULL, 4),
    ('Integer', 20, NULL, NULL, 2),
    ('Integer', 10, NULL, NULL, 4),
    ('Integer', 18, NULL, NULL, 2),
    ('Integer', 9, NULL, NULL, 4),
    ('Integer', 17, NULL, NULL, 2),
    ('Integer', 8, NULL, NULL, 4),
    ('Integer', 22, NULL, NULL, 2),
    ('Integer', 12, NULL, NULL, 4),
    ('Integer', 25, NULL, NULL, 2),
    ('Integer', 14, NULL, NULL, 4),
    ('Integer', 30, NULL, NULL, 2),
    ('Integer', 16, NULL, NULL, 4),
    ('Integer', 35, NULL, NULL, 2),
    ('Integer', 18, NULL, NULL, 4),
    ('Integer', 40, NULL, NULL, 2),
    ('Integer', 20, NULL, NULL, 4),
     
    -- True/False
    ('True/False', 6, NULL, NULL, NULL),
    ('True/False', 5, NULL, NULL, NULL),
    ('True/False', 8, NULL, NULL, NULL),
    ('True/False', 10, NULL, NULL, NULL),
     
    -- Fill In The Blanks
    ('Fill In The Blanks', 8, NULL, NULL, NULL),
    ('Fill In The Blanks', 10, NULL, NULL, NULL),
    ('Fill In The Blanks', 11, NULL, NULL, NULL),
    ('Fill In The Blanks', 13, NULL, NULL, NULL),
    ('Fill In The Blanks', 15, NULL, NULL, NULL);
     
    -- Inserting MCQ entries for Solving Linear Equations, Graphing Linear Equations, Systems of Linear Equations, Properties of Triangles, Properties of Quadrilaterals, Circle Theorems, Trigonometric Identities, Trigonometric Functions and Graphs, Solving Trigonometric Equations
     
    INSERT INTO EXERCISE_DATA (ex_ID, ex_key, ex_value) VALUES
     
    -- Inserting MCQ entries for Solving Linear Equations
    (1, 'question', 'What is the solution to the equation 2x + 5 = 11?'),
    (1, 'option a', 'x = 3'),
    (1, 'option b', 'x = 6'),
    (1, 'option c', 'x = -3'),
    (1, 'option d', 'x = -6'),
    (1, 'correct option', 'A'),
     
    (2, 'question', 'What is the value of x in the equation 3(x + 4) = 27?'),
    (2, 'option a', 'x = 7'),
    (2, 'option b', 'x = 6'),
    (2, 'option c', 'x = 5'),
    (2, 'option d', 'x = 8'),
    (2, 'correct option', 'C'),
     
    -- Inserting MCQ entries for Graphing Linear Equations
    (3, 'question', 'What is the slope of the line with equation y = 3x - 2?'),
    (3, 'option a', '3'),
    (3, 'option b', '-3'),
    (3, 'option c', '2'),
    (3, 'option d', '-2'),
    (3, 'correct option', 'A'),
     
    (4, 'question', 'Which of the following is the equation of a vertical line?'),
    (4, 'option a', 'y = 3x + 2'),
    (4, 'option b', 'x = 5'),
    (4, 'option c', 'y = -2x + 4'),
    (4, 'option d', 'y = 2x - 3'),
    (4, 'correct option', 'B'),
     
    -- Inserting MCQ entries for Systems of Linear Equations
    (5, 'question', 'What is the solution to the system of equations: 2x + y = 5, x - y = 3?'),
    (5, 'option a', 'x = 2, y = 1'),
    (5, 'option b', 'x = 3, y = 2'),
    (5, 'option c', 'x = 1, y = 2'),
    (5, 'option d', 'x = 2, y = 3'),
    (5, 'correct option', 'A'),
     
    (6, 'question', 'How many solutions does the system of equations: 3x - 2y = 6, 6x - 4y = 12 have?'),
    (6, 'option a', 'One solution'),
    (6, 'option b', 'Infinite solutions'),
    (6, 'option c', 'No solution'),
    (6, 'option d', 'Two solutions'),
    (6, 'correct option', 'C'),
     
    -- Inserting MCQ entries for Properties of Triangles
    (7, 'question', 'What is the sum of the interior angles of a triangle?'),
    (7, 'option a', '90 degrees'),
    (7, 'option b', '180 degrees'),
    (7, 'option c', '270 degrees'),
    (7, 'option d', '360 degrees'),
    (7, 'correct option', 'B'),
     
    (8, 'question', 'Which of the following is the longest side in a right-angled triangle?'),
    (8, 'option a', 'Hypotenuse'),
    (8, 'option b', 'Adjacent side'),
    (8, 'option c', 'Opposite side'),
    (8, 'option d', 'None of the above'),
    (8, 'correct option', 'A'),
     
    -- Inserting MCQ entries for Properties of Quadrilaterals
    (9, 'question', 'What is the sum of the interior angles of a quadrilateral?'),
    (9, 'option a', '180 degrees'),
    (9, 'option b', '270 degrees'),
    (9, 'option c', '360 degrees'),
    (9, 'option d', '450 degrees'),
    (9, 'correct option', 'C'),
     
    (10, 'question', 'Which of the following is a parallelogram with all sides congruent?'),
    (10, 'option a', 'Rectangle'),
    (10, 'option b', 'Square'),
    (10, 'option c', 'Rhombus'),
    (10, 'option d', 'Trapezoid'),
    (10, 'correct option', 'B'),
     
    -- Inserting MCQ entries for Circle Theorems
    (11, 'question', 'What is the relationship between the radius and the tangent of a circle?'),
    (11, 'option a', 'Perpendicular'),
    (11, 'option b', 'Parallel'),
    (11, 'option c', 'Equal'),
    (11, 'option d', 'None of the above'),
    (11, 'correct option', 'A'),
     
    (12, 'question', 'What is the measure of the central angle subtended by an arc with a measure of 60 degrees?'),
    (12, 'option a', '60 degrees'),
    (12, 'option b', '90 degrees'),
    (12, 'option c', '120 degrees'),
    (12, 'option d', '180 degrees'),
    (12, 'correct option', 'A'),
     
    -- Inserting MCQ entries for Trigonometric Identities
    (13, 'question', 'What is the value of sin^2(x) + cos^2(x)?'),
    (13, 'option a', '0'),
    (13, 'option b', '1'),
    (13, 'option c', '-1'),
    (13, 'option d', '2'),
    (13, 'correct option', 'B'),
     
    (14, 'question', 'Which of the following is an identity involving sine and cosine functions?'),
    (14, 'option a', 'sin(x + y) = sin(x) + sin(y)'),
    (14, 'option b', 'cos(x + y) = cos(x)cos(y) - sin(x)sin(y)'),
    (14, 'option c', 'tan(x + y) = tan(x) + tan(y)'),
    (14, 'option d', 'cot(x + y) = cot(x)cot(y) - 1'),
    (14, 'correct option', 'B'),
     
    -- Inserting MCQ entries for Trigonometric Functions and Graphs
    (15, 'question', 'What is the amplitude of the function y = 3sin(2x)?'),
    (15, 'option a', '3'),
    (15, 'option b', '2'),
    (15, 'option c', '-3'),
    (15, 'option d', '-2'),
    (15, 'correct option', 'A'),
     
    (16, 'question', 'Which of the following represents a phase shift of pi/2 units to the left for the function y = cos(x)?'),
    (16, 'option a', 'y = cos(x + pi/2)'),
    (16, 'option b', 'y = cos(x - pi/2)'),
    (16, 'option c', 'y = cos(x + pi)'),
    (16, 'option d', 'y = cos(x - pi)'),
    (16, 'correct option', 'A'),
     
    -- Inserting MCQ entries for Solving Trigonometric Equations
    (17, 'question', 'What is the solution to the equation sin(x) = 1?'),
    (17, 'option a', 'x = pi/2'),
    (17, 'option b', 'x = pi'),
    (17, 'option c', 'x = 3pi/2'),
    (17, 'option d', 'x = 2pi'),
    (17, 'correct option', 'A'),
     
    (18, 'question', 'What is the solution to the equation cos(2x) = -1?'),
    (18, 'option a', 'x = pi/2'),
    (18, 'option b', 'x = pi'),
    (18, 'option c', 'x = 3pi/2'),
    (18, 'option d', 'x = 2pi'),
    (18, 'correct option', 'B');
     
     
    -- inserting values into TAG_VALUES
    -- inserting course tags
    INSERT INTO TAG_VALUES (tag_ID, tag_value) 
    VALUES 
        (1, 'Mathematics'),
        (1, 'Physics'),
        (1, 'Biology'),
        (1, 'Chemistry'),
        (1, 'Literature');
    -- inserting module tags
    INSERT INTO TAG_VALUES (tag_ID, tag_value) 
    VALUES 
        (2, 'Mod 1 Math'),
        (2, 'Mod 2 Math'),
        (2, 'Mod 3 Math'),
        (2, 'Mod 1 Physics'),
        (2, 'Mod 2 Physics'),
        (2, 'Mod 3 Physics'),
        (2, 'Mod 1 Biology'),
        (2, 'Mod 2 Biology'),
        (2, 'Mod 3 Biology'),
        (2, 'Mod 1 Chem'),
        (2, 'Mod 2 Chem'),
        (2, 'Mod 3 Chem'),
        (2, 'Mod 1 Lit'),
        (2, 'Mod 2 Lit'),
        (2, 'Mod 3 Lit');
     
    -- inserting subskill tags
    INSERT INTO TAG_VALUES (tag_ID, tag_value) 
    VALUES 
        (3, 'Algebra I'),
        (3, 'Geometry I'),
        (3, 'Trigonometry I'),
        (3, 'Algebra II'),
        (3, 'Geometry II'),
        (3, 'Trigonometry II'),
        (3, 'Calculus I'),
        (3, 'Calculus II'),
        (3, 'Calculus III');
     
    -- inserting skilltopic tags
    INSERT INTO TAG_VALUES (tag_ID, tag_value) 
    VALUES 
        (4, 'Solving Linear Equations'),
        (4, 'Graphing Linear Equations'),
        (4, 'Systems of Linear Equations'),
        (4, 'Properties of Triangles'),
        (4, 'Properties of Quadrilaterals'),
        (4, 'Circle Theorems'),
        (4, 'Trigonometric Identities'),
        (4, 'Trigonometric Functions and Graphs'),
        (4, 'Solving Trigonometric Equations'),
        (4, 'Quadratic Functions and Equations'),
        (4, 'Polynomial Functions'),
        (4, 'Exponential and Logarithmic Functions'),
        (4, 'Area and Perimeter of Polygons'),
        (4, 'Volume and Surface Area of Solids'),
        (4, 'Transformations and Symmetry'),
        (4, 'Law of Sines and Cosines'),
        (4, 'Vectors in the Plane'),
        (4, 'Polar Coordinates'),
        (4, 'Limits and Continuity'),
        (4, 'Derivatives of Functions'),
        (4, 'Applications of Differentiation'),
        (4, 'Integration Techniques'),
        (4, 'Applications of Integration'),
        (4, 'Sequences and Series'),
        (4, 'Parametric Equations and Polar Coordinates'),
        (4, 'Vector-Valued Functions'),
        (4, 'Partial Derivatives and Multiple Integrals');
     
    -- populating the exercise_tag_link table
    INSERT INTO EXERCISE_TAG_LINK (ex_ID, tag_ID, tag_ref)
    VALUES
        (1, 4, 30),
        (2, 4, 30),
        (3, 4, 30),
        (4, 4, 30),
        (5, 4, 30),
        (6, 4, 30),
        (7, 4, 30),
     
        (8, 4, 31),
        (9, 4, 31),
        (10, 4, 31),
        (11, 4, 31),
        (12, 4, 31),
        (13, 4, 31),
        (14, 4, 31),
     
        (15, 4, 32),
        (16, 4, 32),
        (17, 4, 32),
        (18, 4, 32),
        (19, 4, 32),
        (20, 4, 32),
        
        (21, 4, 33),
        (22, 4, 33),
        (23, 4, 33),
        (24, 4, 33),
        (25, 4, 33),
        (26, 4, 33),
        (27, 4, 33),
     
        (28, 4, 34),
        (29, 4, 34),
        (30, 4, 34),
        (31, 4, 34),
        (32, 4, 34),
        (33, 4, 34),
        (34, 4, 34),
     
        (35, 4, 35),
        (36, 4, 35),
        (37, 4, 35),
        (38, 4, 35),
        (39, 4, 35),
        (40, 4, 35),
     
        (41, 4, 36),
        (42, 4, 36),
        (43, 4, 36),
        (44, 4, 36),
        (45, 4, 36),
        (46, 4, 36),
        (47, 4, 36),
     
        (48, 4, 37),
        (49, 4, 37),
        (50, 4, 37),
        (51, 4, 37),
        (52, 4, 37),
        (53, 4, 37),
        (54, 4, 37),
     
        (55, 4, 38),
        (56, 4, 38),
        (57, 4, 38),
        (58, 4, 38),
        (59, 4, 38),
        (60, 4, 38),
     
        (61, 4, 39),
        (62, 4, 39),
        (63, 4, 39),
        (64, 4, 39),
        (65, 4, 39),
        (66, 4, 39),
        (67, 4, 39),
     
        (68, 4, 40),
        (69, 4, 40),
        (70, 4, 40),
        (71, 4, 40),
        (72, 4, 40),
        (73, 4, 40),
        (74, 4, 40),
        
        (75, 4, 41),
        (76, 4, 41),
        (77, 4, 41),
        (78, 4, 41),
        (79, 4, 41),
        (80, 4, 41),
     
        (81, 4, 42),
        (82, 4, 42),
        (83, 4, 42),
        (84, 4, 42),
        (85, 4, 42),
        (86, 4, 42),
        (87, 4, 42),
     
        (88, 4, 43),
        (89, 4, 43),
        (90, 4, 43),
        (91, 4, 43),
        (92, 4, 43),
        (93, 4, 43),
        (94, 4, 43),
     
        (95, 4, 45),
        (96, 4, 45),
        (97, 4, 45),
        (98, 4, 45),
        (99, 4, 45),
        (100, 4, 45),
     
        (101, 4, 46),
        (102, 4, 46),
        (103, 4, 46),
        (104, 4, 46),
        (105, 4, 46),
        (106, 4, 46),
        (107, 4, 46),
     
        (108, 4, 47),
        (109, 4, 47),
        (110, 4, 47),
        (111, 4, 47),
        (112, 4, 47),
        (113, 4, 47),
        (114, 4, 47),
     
        (115, 4, 48),
        (116, 4, 48),
        (117, 4, 48),
        (118, 4, 48),
        (119, 4, 48),
        (120, 4, 48),
     
        (121, 4, 49),
        (122, 4, 49),
        (123, 4, 49),
        (124, 4, 49),
        (125, 4, 49),
        (126, 4, 49),
        (127, 4, 49),
     
        (128, 4, 50),
        (129, 4, 50),
        (130, 4, 50),
        (131, 4, 50),
        (132, 4, 50),
        (133, 4, 50),
        (134, 4, 50),
     
        (135, 4, 51),
        (136, 4, 51),
        (137, 4, 51),
        (138, 4, 51),
        (139, 4, 51),
        (140, 4, 51),
     
        (141, 4, 52),
        (142, 4, 52),
        (143, 4, 52),
        (144, 4, 52),
        (145, 4, 52),
        (146, 4, 52),
        (147, 4, 52),
     
        (148, 4, 53),
        (149, 4, 53),
        (150, 4, 53),
        (151, 4, 53),
        (152, 4, 53),
        (153, 4, 53),
        (154, 4, 53),
     
        (155, 4, 54),
        (156, 4, 54),
        (157, 4, 54),
        (158, 4, 54),
        (159, 4, 54),
        (160, 4, 54),
     
        (161, 4, 55),
        (162, 4, 55),
        (163, 4, 55),
        (164, 4, 55),
        (165, 4, 55),
        (166, 4, 55),
        (167, 4, 55),
     
        (168, 4, 56),
        (169, 4, 56),
        (170, 4, 56),
        (171, 4, 56),
        (172, 4, 56),
        (173, 4, 56),
        (174, 4, 56);
     
        -- (175, 4, 57),
        -- (176, 4, 57),
        -- (177, 4, 57),
        -- (178, 4, 57),
        -- (179, 4, 57),
        -- (180, 4, 57);
     