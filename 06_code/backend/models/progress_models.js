// ALL TEST DB OPS 


// ALL IMPORTS
const pool = require('../db_connection.js');
const QGen = require('../randomQGen.js');


// ALL FUNCTIONS
async function showUserProgress() {
    const sql = `SELECT 
        Current_Course_ID AS course_id, 
        Current_Module_ID AS module_id, 
        Current_Subskill_ID AS subskill_id,
        Level AS level,
        State AS state 
    FROM USERS_PROGRESS;`;

    const [rows, fields] = await pool.execute(sql);
    return rows[0];
};



























// EVALUATE ONLINE ASSESSMENT PART
async function evaluateOnlineAssessment(arrayOfResponses) {
    // assessment variables initialized
    let overallPass = true;
    let passSkillTopicsArray;

    // Overall Failed
    overallCorrectSubmissions = await countCorrectResponses(arrayOfResponses);
    if (overallCorrectSubmissions < 0.7 * arrayOfResponses.length) {
        overallPass = false;
    }

    // Map questionID to skilltopics it is testing
    const arrayOfQuestionIDs = arrayOfResponses.map(response => parseInt(response.question_id, 10));
    questionIDToSkillTopicsDict = await mapQuestionsToSkillTopics(arrayOfQuestionIDs);

    // map skilltopicIDs to questionIDs
    skillTopicIDToQuestionIDDict = await mapSkillTopicsToQuestions(questionIDToSkillTopicsDict);
    const numberOfSkillTopics = Object.keys(skillTopicIDToQuestionIDDict).length;
    passSkillTopicsArray = new Array(numberOfSkillTopics).fill(true);

    let skillTopicIndex = 0;
    for (const key in skillTopicIDToQuestionIDDict) {
        if (skillTopicIDToQuestionIDDict.hasOwnProperty(key)) {
            const values = skillTopicIDToQuestionIDDict[key];

            // obtain responses from arrayOfResponses belonging to a particular skilltopic
            arrayOfResponsesForSkillTopicID = [];
            for (let index = 0; index < values.length; index++) {
                let QID = values[index];
                for (let i = 0; i < arrayOfResponses.length; i++) {
                    const response = arrayOfResponses[i];
                    if (response.question_id == QID) {
                        arrayOfResponsesForSkillTopicID.push(response);
                    }
                }
            }

            correctSubmissionsForSkillTopicID = await countCorrectResponses(arrayOfResponsesForSkillTopicID);
            // Failed Specific SkillTopic
            if (correctSubmissionsForSkillTopicID < 0.7 * arrayOfResponsesForSkillTopicID.length) {
                passSkillTopicsArray[skillTopicIndex] = false;
            }
            skillTopicIndex += 1;
        }
    }

    console.log("Overall pass: ");
    console.log(overallPass);
    console.log("passSkillTopics Array is: ");
    console.log(passSkillTopicsArray);

    if (overallPass == false) {
        // return first skilltopicID
        console.log("Overall failed online assessment");
    }
    for (let index = 0; index < passSkillTopicsArray.length; index++) {
        const element = passSkillTopicsArray[index];
        if (element === false) {
            skillTopicID = await getNthKey(skillTopicIDToQuestionIDDict, index);
            console.log(skillTopicID);

            // course progress after initial assessment
            // obtain the module and course ID of the skilltopic that we failed
            const sql1 = `SELECT S.ID FROM SUBSKILLS S
        JOIN SUBSKILL_SKILLTOPIC_LINK SST ON S.ID = SST.subskill_ID
        JOIN SKILLTOPICS ST ON ST.ID = SST.skilltopic_ID
        WHERE ST.ID = ?`;
            const [rows1, fields1] = await pool.execute(sql1, [skillTopicID]);
            const subskillID = rows1[0].ID;
            console.log(subskillID);

            const sql2 = `SELECT M.ID FROM MODULES M
        JOIN MODULE_SUBSKILL_LINK MS ON M.ID = MS.module_ID
        JOIN SUBSKILLS S ON S.ID = MS.subskill_ID
        WHERE S.ID = ?`;
            const [rows2, fields2] = await pool.execute(sql2, [subskillID]);
            const moduleID = rows2[0].ID;
            console.log(moduleID);

            const sql3 = `SELECT C.ID FROM COURSES C
        JOIN COURSE_MODULE_LINK CM ON C.ID = CM.course_ID
        JOIN MODULES M ON M.ID = CM.module_ID
        WHERE M.ID = ?`;
            const [rows3, fields3] = await pool.execute(sql3, [moduleID]);
            const courseID = rows3[0].ID;
            console.log(courseID);

            // insert into the users table
            const sql4 = `INSERT INTO USERS_PROGRESS (User_Id, Current_Course_ID, Current_Module_ID, Current_Subskill_ID, Current_Skilltopic_ID)
        VALUES (NULL, ?, ?, ?, ?);`
            const [rows4, fields4] = await pool.execute(sql4, [courseID, moduleID, subskillID, skillTopicID]);

            console.log(rows4);
            console.log(rows4.affectedRows);
            return [courseID, moduleID];
        }
    }
    // none of the skilltopics have failed. 
    return -1;
};


async function countCorrectResponses(arrayOfResponses) {
    let correctSubmissions = 0;

    for (let index = 0; index < arrayOfResponses.length; index++) {
        const response = arrayOfResponses[index];
        if (response.user_option === response.correct_option) {
            correctSubmissions += 1;
        }
    }
    return correctSubmissions;
};


async function mapQuestionsToSkillTopics(arrayOfQuestionIDs) {
    const dict = {};

    for (let index = 0; index < arrayOfQuestionIDs.length; index++) {
        const questionID = arrayOfQuestionIDs[index];

        // obtaining skilltopic name / tag value
        sql = `SELECT TV.tag_value
        FROM EXERCISES E
        JOIN EXERCISE_TAG_LINK ETL ON ETL.ex_ID = E.ID
        JOIN TAGS T ON T.ID = ETL.tag_ID
        JOIN TAG_VALUES TV ON TV.ID = ETL.tag_ref
        WHERE tag_type = "SKILLTOPIC"
        AND E.ID = ?;`
        const [rows, fields] = await pool.execute(sql, [questionID]);
        for (let i = 0; i < rows.length; i++) {
            skillTopicName = rows[i].tag_value;
            // obtaining skilltopic IDs 
            sql2 = `SELECT ID FROM SKILLTOPICS
        WHERE skilltopic_name = ?`
            const [rows2, fields2] = await pool.execute(sql2, [skillTopicName]);
            skillTopicID = rows2[0].ID;

            // create a new array if it doesn't exist or is empty
            if (!dict[questionID] || dict[questionID].length === 0) {
                dict[questionID] = [];
            }
            // append skillTopicID to value array of key QID
            dict[questionID].push(skillTopicID);
        }
    }
    return dict;
};


async function mapSkillTopicsToQuestions(inputDict) {
    const dict = {};

    for (const key in inputDict) {
        if (inputDict.hasOwnProperty(key)) {
            const values = inputDict[key];
            values.forEach(ID => {
                if (!dict[ID]) {
                    dict[ID] = [key];
                }
                else {
                    dict[ID].push(key);
                }
            });
        }
    }
    return dict;
};


async function getNthKey(dictionary, n) {
    const keys = Object.keys(dictionary);
    if (n >= 0 && n < keys.length) {
        return keys[n];
    } else {
        return undefined;
    }
};

















// ALL EXPORTS
module.exports = {
    showUserProgress,
    evaluateOnlineAssessment
};