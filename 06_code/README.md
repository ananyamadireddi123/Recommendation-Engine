# TEAM 6 --- D.A.T.A

###### D : Daksh Shah
###### A : Ananya Madireddy
###### T : Tejas Cavale
###### A : Aditya Mishra

## Project : Recommendation Engine  
Client : GradWise

## Code Documentation

# How to get access to database
There is a file database.sql in database folder in backend folder in Codebase folder -> /dass-project-spring-2024-team-6/Codebase/backend/database/database.sql
\\
All the database schema along with database content is exported to that sql file.  Make sure a database is already created in your mysql, and you should use the mysql query "USE DASS_Project" before using the below command.
\\
Command in terminal :  
mysql -u root -p < database.sql


# Template ID Info

1-> Initial Assessment for Course 1
2-> Practice Test level 1
3-> Practice Test level 2
4-> Practice Test level 3
5-> Practice Test level 4
6-> Practice Test level 5
7-> Initial Assessment for Course 2

# User Progress table info

Level : level in subskill in which the user is -> practice test level he/ she is attempting.
State : Passed, Failed, Ongoing, Done are the values that can be given to this attribute.

# Assumptions and some important info 

In the user progress table the flow of learning is as follows:<br />
First the user enter the website and will be presented with an initial assessment before every course.
If a person fails any one of the module, the user will be redirected to the learning material of the subskills in that module.
If all the modules passed, the user will be redirected to the next initial assessment .
Once done with the learning material, the user is supposed to give practice tests of different levels, and if any of it failed the user must redo teh test until passed and will not be given chance to go ahead.
Correspondingly teh user progress will be updated accordingly.
When the course is passed, level = -1, module = -1, subskill=-1 if passed in teh initial assessment itself.


