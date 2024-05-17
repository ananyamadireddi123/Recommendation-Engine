// ALL TEST DB OPS 


// ALL IMPORTS
const pool = require('../db_connection.js');
const QGen = require('../randomQGen.js');
const path = require('path');
const fs = require('fs');
const { Console } = require('console');
// ALL FUNCTIONS
async function getOnlineAssessment(parentType, parentName) {
    // special case: parentType = COURSES
    // get list of skilltopic IDs of skill topics in the course 
    console.log("code2.js l505 parentname =")
    console.log(parentName)
    const listOfSkillTopicIDs = await getSkillTopicIDsFromCourseID(parentName);

    console.log("List of SkillTopic IDs in Course is: ");
    console.log(listOfSkillTopicIDs);

    // Obtain IDs of questions for each Skill Topic
    listOfQuestionIDs = [];
    for (let index = 0; index < listOfSkillTopicIDs.length; index++) {
        const STID = listOfSkillTopicIDs[index];

        currentSTQuestionIDs = await getQuestionsForSkillTopicID(STID);
        listOfQuestionIDs.push(...currentSTQuestionIDs);
    }

    return listOfQuestionIDs;
}


async function getSkillTopicIDsFromCourseID(courseName) {
    const moduleSql = `SELECT M.ID
    FROM COURSES C
    JOIN COURSE_MODULE_LINK CM ON C.ID = CM.course_ID
    JOIN MODULES M ON CM.module_ID = M.ID
    WHERE C.course_name = ?`;
    const [moduleRows, moduleFields] = await pool.execute(moduleSql, [courseName]);

    const listOfModuleIDs = moduleRows.map(row => row.ID);
    console.log("list of modules = ")
    console.log(listOfModuleIDs);

    let listOfSkillTopicIDs = [];
    for (let index = 0; index < listOfModuleIDs.length; index++) {
        const MID = listOfModuleIDs[index];
        const listOfSkillTopicIDsInCurrentModule = await getSkillTopicsFromModuleID(MID);
        listOfSkillTopicIDs.push(...listOfSkillTopicIDsInCurrentModule);
    }
    return listOfSkillTopicIDs;
}


async function getQuestionsForSkillTopicID(skillTopicID) {
    // if the ETL table stores the names of the skillTopics instead of their IDs, then 
    // we need to run another query to find the skilltopic_name 
    // using the skilltopicID from the SKILLTOPICS table
    const sql = `SELECT *
    FROM EXERCISES E
    JOIN EXERCISE_TAG_LINK ETL ON ETL.ex_ID = E.ID
    JOIN TAGS T ON T.ID = ETL.tag_ID
    JOIN TAG_VALUES TV ON TV.ID = ETL.tag_ref
    WHERE T.tag_type = 'SKILLTOPIC'
    AND TV.tag_value = 
    (SELECT skilltopic_name FROM SKILLTOPICS WHERE ID = ?)`;

    const [rows, fields] = await pool.execute(sql, [skillTopicID]);
    return rows;
}


async function getSkillTopicsFromModuleID(moduleID) {
    const subSkillSql = `SELECT SS.ID
    FROM MODULES M
    JOIN MODULE_SUBSKILL_LINK MS ON M.ID = MS.module_ID
    JOIN SUBSKILLS SS ON MS.subskill_ID = SS.ID
    WHERE M.ID = ?`;
    const [subSkillRows, subSkillFields] = await pool.execute(subSkillSql, [moduleID]);

    const listofSubSkillIDs = subSkillRows.map(row => row.ID);

    // console.log("List of subskillIDs in Module ", moduleID, " are: ");
    // console.log(listofSubSkillIDs);

    let listOfSkillTopicIDs = []
    for (let index = 0; index < listofSubSkillIDs.length; index++) {
        const SSID = listofSubSkillIDs[index];
        let listOfSkillTopicIDsInCurrentSubSkill = await getSkillTopicsFromSubSkillID(SSID);
        listOfSkillTopicIDs.push(...listOfSkillTopicIDsInCurrentSubSkill);
        // console.log(listOfSkillTopicIDs);
    }
    return listOfSkillTopicIDs;
}


async function getSkillTopicsFromSubSkillID(subskillID) {
    const skillTopicSql = `SELECT ST.ID
    FROM SUBSKILLS SS
    JOIN SUBSKILL_SKILLTOPIC_LINK SST ON SS.ID = SST.subskill_ID
    JOIN SKILLTOPICS ST ON SST.skilltopic_ID = ST.ID
    WHERE SS.ID = ?`;

    const [skillTopicRows, skillTopicFields] = await pool.execute(skillTopicSql, [subskillID]);
    const listOfSkillTopicIDs = skillTopicRows.map(row => row.ID);

    // console.log("Skill Topics in Subskill ", subskillID, " are: ")
    // console.log(listOfSkillTopicIDs);
    return listOfSkillTopicIDs;
}



async function SubmitResponseMapping(response_mapping) {
    const filePath = path.join(__dirname, 'Test.json');
    const data = await fs.promises.readFile(filePath, { encoding: 'utf8' });
    // Parse the JSON data
    const Tests = JSON.parse(data);
    console.log("LINE 119 test models");
    //  console.log("Tests:",Tests);
    // console.log(Tests[1].sections[0].questions);
    return Tests;
}





// EXAM TEMPLATE PART
async function getExamTemplate(template_id) {
    // this is for initial assessment. the values can be changed as required later. 
    // We need to basically change the template_id == thing to the type of assessment.
    if (template_id == 1 || template_id == 7) {
        console.log(template_id);
        const sql_et = 'SELECT * FROM EXAM_TEMPLATES as e WHERE e.ID = (?)';
        const [rows, fields] = await pool.execute(sql_et, [template_id]);
        console.log(rows);
        if (rows[0].parent_type == "Course") {
            const sql_c = "SELECT * FROM COURSES as c WHERE c.ID = (?)";
            const [rows_c, fields_c] = await pool.execute(sql_c, [rows[0].parent_ID]);
            var parent_name = rows_c[0].course_name;
            var parent_ID = rows_c[0].ID;
            const sql_eti = 'SELECT * FROM EXAM_TEMPLATES_INFO AS et where et.Template_ID =(?)';
            const [sections_in_exam, fields_eti] = await pool.execute(sql_eti, [template_id]);
            console.log("The Sections for the given exam template are:");
            console.log(sections_in_exam);
            if (rows[0].group_by == "Module") {
                let modules_in_course = await viewModulesInCourse(parent_name);
                console.log(modules_in_course);
                // Loop through all the modules
                Tests = []
                // Tests is an array of objects. The first is the info object that conatins the course name, course ID, pass percentage, type and group_by and the rest are the modules and their questions
                Tests.push({ course: parent_name, course_ID: parent_ID, group_by: "Module", pass_percentage: rows[0].pass_percentage, type: rows[0].type });
                for (let i = 0; i < modules_in_course.length; i++) {
                    module_number = modules_in_course[i].module_number;
                    skilltopics_in_module = await getSkillTopicsFromModuleID(modules_in_course[i].module_number);
                    questions_in_module = [];
                    // Note: Have not handled the edge where one question is part of more than one skilltopic
                    for (let j = 0; j < skilltopics_in_module.length; j++) {
                        let questions = await getQuestionsForSkillTopicID(skilltopics_in_module[j]);
                        // console.log(skilltopics_in_module[j]);
                        // console.log(questions);
                        questions_in_module = questions_in_module.concat(questions);
                    }
                    // Now we need to make the sections for each module.

                    questions_in_module_sectionwise = [];
                    for (let j = 0; j < sections_in_exam.length; j++) {
                        let allowed_levels = sections_in_exam[j].allowed_levels.includes(',') ? sections_in_exam[j].allowed_levels.split(',').map(value => value.trim()) : [sections_in_exam[j].allowed_levels];
                        let allowed_question_types = sections_in_exam[j].Allowed_Question_Types.includes(',') ? sections_in_exam[j].Allowed_Question_Types.split(',').map(value => value.trim()) : [sections_in_exam[j].Allowed_Question_Types];
                        for (let k = 0; k < allowed_levels.length; k++) {
                            allowed_levels[k] = Number(allowed_levels[k]);
                        }
                        console.log("LINE 169 allowed levels:", allowed_levels);
                        // console.log(allowed_question_types);
                        //TODO: Add the logic to filter the questions based on the allowed levels and question types

                        let filtered_questions = questions_in_module.filter((question) => {
                            return allowed_levels.includes(question.ex_level) && allowed_question_types.includes(question.ex_type);

                        });
                        console.log("filtered_questions = ", filtered_questions);
                        // mishra function on filtered_questions here
                        // console.log(filtered_questions);
                        // To generate a list of question IDs, levels and times
                        let listOfQuestionIDs = filtered_questions.map(question => question.ex_ID);
                        let listOfLevels = filtered_questions.map(question => question.ex_level);
                        let listOfQuestionTimes = filtered_questions.map(question => question.ex_time);
                        minTotalTime = sections_in_exam[j].min_time;
                        maxTotalTime = sections_in_exam[j].max_time;
                        distributionOfLevels = []
                        // Iterate through sections_in_exam[j].level_distribution and add the values to distributionOfLevels
                        for (let key in sections_in_exam[j].level_distribution) {
                            distributionOfLevels[Number(key)] = sections_in_exam[j].level_distribution[key];
                        }
                        // console.log(distributionOfLevels);
                        // for ( let k = 0 ; k < filtered_questions.length; k++){
                        //   console.log(filtered_questions[k].ID);
                        // }
                        console.log("LINE 194 TEST_MODELS.JS listOfLevels = ", listOfLevels);
                        generatedQuestionIDs = QGen.generateQuestions(listOfQuestionIDs, listOfLevels, listOfQuestionTimes, minTotalTime, maxTotalTime, distributionOfLevels);
                        console.log(generatedQuestionIDs);
                        questions_in_section = { section_number: sections_in_exam[j].section_Name, pass_percentage: sections_in_exam[j].pass_percentage, level_distribution: sections_in_exam[j].level_distribution, questions: generatedQuestionIDs, };
                        questions_in_module_sectionwise.push(questions_in_section);
                        // function generateQuestions(listOfQuestionIDs, listOfLevels, listOfQuestionTimes, minTotalTime, maxTotalTime, distributionOfLevels) 
                        console.log("LINE 202 TEST_MODELS.JS: generatedQuestionIDs = ", generatedQuestionIDs);
                    }
                    Tests.push({ module_number: module_number, sections: questions_in_module_sectionwise });
                }
                console.log("LINE 206 TEST_MODELS.JS");
                console.log("The questions associated with given course are");
                console.log("Course: ", parent_name);
                console.log(Tests);
                console.log("LINE 210 TEST_MODELS.JS");
            }
            const filePath = path.join(__dirname, `Test.json`);
            await fs.promises.writeFile(filePath, JSON.stringify(Tests, null, 2));
            console.log(`Saved Tests object to ${filePath}`);
            return Tests;
        }
    }
    // practice tests
    // the below is for practice tests. these values can be changed later on to type of tests.
    else if (template_id == 2 || template_id == 3 || template_id == 4 || template_id == 5 || template_id == 6) {

        console.log(template_id);
        const sql_et = 'SELECT * FROM EXAM_TEMPLATES as e WHERE e.ID = (?)';
        const [rows, fields] = await pool.execute(sql_et, [template_id]);
        console.log(rows);

        if (rows[0].parent_type == "Module") {
            const sql_c = "SELECT * FROM MODULES as m WHERE m.ID = (?)";
            const [rows_c, fields_c] = await pool.execute(sql_c, [rows[0].parent_ID]);
            var parent_name = rows_c[0].module_name;
            var parent_ID = rows_c[0].ID;

            const sql_eti = 'SELECT * FROM EXAM_TEMPLATES_INFO AS et where et.Template_ID =(?)';
            const [sections_in_exam, fields_eti] = await pool.execute(sql_eti, [template_id]);
            console.log("The Sections for the given exam template are:");
            console.log(sections_in_exam);

            if (rows[0].group_by == "Subskill") {
                // RUN SQL QUERY TO FIND THE SUBSKILL THE USER IS IN FROM THE TABLE
                // we assume that we only have one user with userID 1
                const sql1 = 'SELECT Current_Subskill_ID FROM USERS_PROGRESS WHERE User_Id = 1';
                const [rows1, fields1] = await pool.execute(sql1);

                console.log("LINE 246 rows1 = ", rows1);
                let currentSubskillID = rows1[0].Current_Subskill_ID;

                // sql query to find the subskill number from the subskill ID
                console.log("LINE 250 TEST_MODELS.JS parent_ID = ", parent_ID, "currentSubskillID = ", currentSubskillID);
                const sql2 = 'SELECT subskill_number FROM MODULE_SUBSKILL_LINK WHERE module_ID = ? and subskill_ID = ?';
                const [rows2, fields2] = await pool.execute(sql2, [parent_ID, currentSubskillID]);

                let subskill_number = rows2[0].subskill_number;
                let subskills_in_module = [{currentSubskillID, subskill_number}];
                //console.log(skilltopics_in_subskill);
                console.log("LINE 257");
                // Loop through all the modules
                Tests = []
                // Tests is an array of objects. The first is the info object that conatins the course name, course ID, pass percentage, type and group_by and the rest are the modules and their questions
                Tests.push({ module_name: parent_name, module_ID: parent_ID, group_by: "Subskill", pass_percentage: rows[0].pass_percentage, type: rows[0].type });
                for (let i = 0; i < subskills_in_module.length; i++) {
                    subskill_number = subskills_in_module[i].subskill_number;
                    console.log(subskill_number);
                    console.log(subskills_in_module);

                    let skilltopics_in_subskill = await getSkillTopicsFromSubSkillID(subskill_number);
                    questions_in_skilltopic = [];
                    // Note: Have not handled the edge where one question is part of more than one skilltopic
                    for (let j = 0; j < skilltopics_in_subskill.length; j++) {
                        let questions = await getQuestionsForSkillTopicID(skilltopics_in_subskill[j]);
                        // console.log(skilltopics_in_module[j]);
                        // console.log(questions);
                        questions_in_skilltopic = questions_in_skilltopic.concat(questions);
                    }


                    questions_in_skilltopic_sectionwise = [];
                    for (let j = 0; j < sections_in_exam.length; j++) {
                        let allowed_levels = sections_in_exam[j].allowed_levels.includes(',') ? sections_in_exam[j].allowed_levels.split(',').map(value => value.trim()) : [sections_in_exam[j].allowed_levels];
                        let allowed_question_types = sections_in_exam[j].Allowed_Question_Types.includes(',') ? sections_in_exam[j].Allowed_Question_Types.split(',').map(value => value.trim()) : [sections_in_exam[j].Allowed_Question_Types];
                        for (let k = 0; k < allowed_levels.length; k++) {
                            allowed_levels[k] = Number(allowed_levels[k]);
                        }
                        console.log("LINE 169 allowed levels:", allowed_levels);
                        // console.log(allowed_question_types);
                        //TODO: Add the logic to filter the questions based on the allowed levels and question types

                        let filtered_questions = questions_in_skilltopic.filter((question) => {
                            return allowed_levels.includes(question.ex_level) && allowed_question_types.includes(question.ex_type);

                        });
                        console.log("filtered_questions = ", filtered_questions);
                        // mishra function on filtered_questions here
                        // console.log(filtered_questions);
                        // To generate a list of question IDs, levels and times
                        let listOfQuestionIDs = filtered_questions.map(question => question.ex_ID);
                        let listOfLevels = filtered_questions.map(question => question.ex_level);
                        let listOfQuestionTimes = filtered_questions.map(question => question.ex_time);
                        minTotalTime = sections_in_exam[j].min_time;
                        maxTotalTime = sections_in_exam[j].max_time;
                        distributionOfLevels = []
                        // Iterate through sections_in_exam[j].level_distribution and add the values to distributionOfLevels
                        for (let key in sections_in_exam[j].level_distribution) {
                            distributionOfLevels[Number(key)] = sections_in_exam[j].level_distribution[key];
                        }
                        // console.log(distributionOfLevels);
                        // for ( let k = 0 ; k < filtered_questions.length; k++){
                        //   console.log(filtered_questions[k].ID);
                        // }
                        console.log("LINE 290 TEST_MODELS.JS listOfLevels = ", listOfLevels);
                        generatedQuestionIDs = QGen.generateQuestions(listOfQuestionIDs, listOfLevels, listOfQuestionTimes, minTotalTime, maxTotalTime, distributionOfLevels);
                        console.log("LINE 292 TEST_MODELS.JS generatedQuestionIDs = ", generatedQuestionIDs);


                        questions_in_section = { section_number: sections_in_exam[j].section_Name, pass_percentage: sections_in_exam[j].pass_percentage, level_distribution: sections_in_exam[j].level_distribution, questions: generatedQuestionIDs };
                        questions_in_skilltopic_sectionwise.push(questions_in_section);
                        // function generateQuestions(listOfQuestionIDs, listOfLevels, listOfQuestionTimes, minTotalTime, maxTotalTime, distributionOfLevels) 
                        console.log("LINE 299 TEST_MODELS.JS: questons_in_section = ", questions_in_section);
                    }
                    Tests.push({ subskill_number: subskill_number, sections: questions_in_skilltopic_sectionwise });
                }
                console.log("LINE 303 TEST_MODELS.JS");

                console.log("LINE 307 TEST_MODELS.JS");
            }
            const filePath = path.join(__dirname, `Test.json`);
            await fs.promises.writeFile(filePath, JSON.stringify(Tests, null, 2));
            console.log(`Saved Tests object to ${filePath}`);
            return Tests;
        }
    }


    //   const sql_eti = 'SELECT * FROM EXAM_TEMPLATES_INFO AS et where et.Template_ID =(?)';
    //   const [rows_eti, fields_eti] = await pool.execute(sql_eti, [template_id]);
    //   console.log(rows_eti);
    //   console.log(typeof (rows_eti[0].level_distribution));
    //   const questiontypeArray = rows_eti[0].Allowed_Question_Types.split(',').map(value => value.trim());
    //   console.log(questiontypeArray);
    //   const allowedlevelsArray = rows_eti[0].allowed_levels.split(',').map(value => value.trim());
    //   for (let index = 0; index < allowedlevelsArray.length; index++) {
    //     allowedlevelsArray[index] = Number(allowedlevelsArray[index]);
    //   }
    //   console.log(allowedlevelsArray);
    //   const sql_exc = `
    //   SELECT *
    //   FROM EXERCISES
    //   WHERE ex_type IN (${questiontypeArray.map(type => `'${type}'`).join(', ')})
    //   AND ex_level IN (${allowedlevelsArray.join(', ')})
    //   AND ID IN (${listOfQuestionIDs.join(', ')});
    // `;
    //   const [rows_exc, fields_exc] = await pool.execute(sql_exc);
    //   arrayOfQuestionIDs = rows_exc.map(row_exc => row_exc.ID);
    //   console.log(arrayOfQuestionIDs);
    //   // The below is only for MCQs.
    //   let Questions = [];
    //   for (let i = 0; i < arrayOfQuestionIDs.length; i++) {
    //     const QID = arrayOfQuestionIDs[i];
    //     const sql_e = 'SELECT * from EXERCISE_DATA AS E WHERE E.ex_ID = (?)';
    //     const [rows_e, fields_e] = await pool.execute(sql_e, [QID]);
    //     console.log(rows_e);
    //     for (let j = 0; j < rows_e.length; j++) {
    //       if (rows_e[j].ex_key == 'question') {
    //         question = rows_e[j].ex_value;

    //       }
    //       if (rows_e[j].ex_key == 'option a') {
    //         OPT_A = rows_e[j].ex_value;

    //       }
    //       if (rows_e[j].ex_key == 'option b') {
    //         OPT_B = rows_e[j].ex_value;
    //       }
    //       if (rows_e[j].ex_key == 'option c') {
    //         OPT_C = rows_e[j].ex_value;
    //       }
    //       if (rows_e[j].ex_key == 'option d') {
    //         OPT_D = rows_e[j].ex_value;
    //       }
    //       if (rows_e[j].ex_key == 'correct option') {
    //         OPT_CRT = rows_e[j].ex_value;
    //       }
    //     }
    //     Question = { QID: QID, 'type': 'MCQ', 'question': question, 'option_a': OPT_A, 'option_b': OPT_B, 'option_c': OPT_C, 'option_d': OPT_D, 'correct_option': OPT_CRT, 'given_answer': -1 }
    //     Questions[i] = Question;
    // }
    // return Questions;
    return;
}


async function viewModulesInCourse(courseName) {
    const sql = `SELECT M.module_name, CM.module_number
    FROM COURSES C
    JOIN COURSE_MODULE_LINK CM ON C.ID = CM.course_ID
    JOIN MODULES M ON CM.module_ID = M.ID
    WHERE C.course_name = ?`;
    const [rows, fields] = await pool.execute(sql,
        [courseName]);

    // console.log(rows)
    return rows;
}

async function viewSkilltopicsInSubskill(subskillName) {
    const sql = `SELECT M.skilltopic_name, CM.skilltopic_number
    FROM SUBSKILLS C
    JOIN SUBSKILL_SKILLTOPIC_LINK CM ON C.ID = CM.subskill_ID
    JOIN SKILLTOPICS M ON CM.skilltopic_ID = M.ID
    WHERE C.subskill_name = ?`;
    const [rows, fields] = await pool.execute(sql,
        [subskillName]);

    // console.log(rows)
    return rows;
}

async function viewSubskillsInModule(moduleName) {
    const sql = `SELECT M.subskill_name, CM.subskill_number
    FROM MODULES C
    JOIN MODULE_SUBSKILL_LINK CM ON C.ID = CM.module_ID
    JOIN SUBSKILLS M ON CM.subskill_ID = M.ID
    WHERE C.module_name = ?`;
    const [rows, fields] = await pool.execute(sql,
        [moduleName]);

    // console.log(rows)
    return rows;

}

async function updateUserProgressForOnlineAssessment(moduleFailed) {
    // moduleFailed is the ID of the module failed 
    console.log("LINE 415 TEST_MODELS.JS");
    const filePath = path.join(__dirname, 'Test.json');
    const data = await fs.promises.readFile(filePath, { encoding: 'utf8' });
    // Parse the JSON data
    const Tests = JSON.parse(data);
    console.log(Tests);
    const courseID = Tests[0].course_ID;
    console.log("moduleFailed = ", moduleFailed);
    console.log("courseID = ", courseID);

    if (moduleFailed == 0) {
        // course passed completely
        // state = passed
        // level = 3
        const sql1 = `UPDATE USERS_PROGRESS SET State = "PASSED"
        WHERE User_Id = 1
        AND Current_Course_ID = ? `

        const [rows1, fields1] = await pool.execute(sql1, [courseID]);
        return rows1;
    }
    else {
        // MID, first SSID IN MID, level = 1
        const sql1 = `SELECT module_ID FROM COURSE_MODULE_LINK
        WHERE course_ID = ?
        AND module_number = ?`;
        const [rows1, fields1] = await pool.execute(sql1, [courseID, moduleFailed]);
        const moduleID = rows1[0].module_ID;

        const sql2 = `SELECT subskill_ID FROM MODULE_SUBSKILL_LINK
        WHERE module_ID = ?
        AND subskill_number = 1`;
        const [rows2, fields2] = await pool.execute(sql2, [moduleID]);
        const subskillID = rows2[0].subskill_ID;

        console.log("LINE 461 TEST_MODELS.JS ");
        console.log("courseID = ", courseID);
        console.log("moduleID = ", moduleID);
        console.log("subskillID = ", subskillID);
        
        
        const sql3 = `UPDATE USERS_PROGRESS 
        SET Current_Module_ID = ?, 
            Current_Subskill_ID = ?,Level = 1 
        WHERE User_Id = 1 
        AND Current_Course_ID = ?`;

        const [rows3, fields3] = await pool.execute(sql3,
            [ moduleID, subskillID,courseID]);

        return rows3;
    }
}

async function updateUserProgressForLearningTest(passFlag) {
    console.log("LINE 458 TEST_MODELS.JS");
    // hardcoding the courseID for now
    // this will be passed as a parameter from the frontend
    const courseID = 1;

    // MID, SSID, module_number, subskill_number needed
    // how many modules in the course
    // how many subskills in the module
    console.log("courseID = ", courseID);

    const sql1 = `SELECT Current_Module_ID, Current_Subskill_ID FROM USERS_PROGRESS
        WHERE User_Id = 1
        AND Current_Course_ID = ?`;
    const [rows1, fields1] = await pool.execute(sql1, [courseID]);

    const moduleID = rows1[0].Current_Module_ID;
    const subskillID = rows1[0].Current_Subskill_ID;

    const sql2 = `SELECT module_number FROM COURSE_MODULE_LINK
    WHERE course_ID = ?
    AND module_ID = ?`;
    const [rows2, fields2] = await pool.execute(sql2, [courseID, moduleID]);
    console.log(rows2);
    const moduleNumber = rows2[0].module_number;

    const sql3 = `SELECT subskill_number FROM MODULE_SUBSKILL_LINK
    WHERE module_ID = ?
    AND subskill_ID = ?`;
    const [rows3, fields3] = await pool.execute(sql3, [moduleID, subskillID]);
    console.log(rows3);
    const subskillNumber = rows3[0].subskill_number;

    const sql4 = `SELECT COUNT(*) AS count FROM COURSE_MODULE_LINK
    WHERE course_ID = ?`;
    const [rows4, fields4] = await pool.execute(sql4, [courseID]);

    const totalNumberOfModules = rows4[0].count;

    const sql5 = `SELECT COUNT(*) AS count FROM MODULE_SUBSKILL_LINK
    WHERE module_ID = ?`;
    const [rows5, fields5] = await pool.execute(sql5, [moduleID]);

    const totalNumberOfSubskills = rows5[0].count;

    // print all the variables we calculated so far
    console.log("507 TEST_MODELS.JS");
    console.log("courseID = ", courseID);
    console.log("moduleID = ", moduleID);
    console.log("subskillID = ", subskillID);
    console.log("moduleNumber = ", moduleNumber);
    console.log("subskillNumber = ", subskillNumber);
    console.log("totalNumberOfModules = ", totalNumberOfModules);
    console.log("totalNumberOfSubskills = ", totalNumberOfSubskills);
    console.log("passFlag = ", passFlag);
    if(passFlag){
        // if the user passed the learning test
        // Find the current Level
        const sql6 = `SELECT Level FROM USERS_PROGRESS
        WHERE User_Id = 1  AND Current_Course_ID = ?`;
        const [rows6, fields6] = await pool.execute(sql6, [courseID]);
        console.log('l552');
        console.log(rows6);
        const currentLevel = rows6[0].Level; 
        if(currentLevel != 3 ){
            // Increase the Level by 1.
            console.log('l557');
            const sql7 = `UPDATE USERS_PROGRESS SET Level = ? WHERE User_Id = 1 AND Current_Course_ID = ?`;
            const [rows7, fields7] = await pool.execute(sql7, [currentLevel + 1, courseID]);
            return rows7;
        }
        else{
            // User has completed the subskill
            // Now to check if the user has completed the module
            if(subskillNumber == totalNumberOfSubskills){
                // Update the Module to the next Module
                if(moduleNumber == totalNumberOfModules){
                    // User has completed the course
                    // Update the State to Passed
                    console.log('l570');
                    const sql8 = `UPDATE USERS_PROGRESS SET State = "PASSED", Level = 1 WHERE User_Id = 1 AND Current_Course_ID = ?`;
                    const [rows8, fields8] = await pool.execute(sql8, [courseID]);
                    return rows8;
                }
                else{
                    // Update the Module to the next Module
                    NewModuleNumber = moduleNumber + 1;
                    // To find the Module ID from the Module Number
                    console.log('l579');
                    const sql9 = `SELECT module_ID FROM COURSE_MODULE_LINK
                    WHERE course_ID = ? AND module_number = ?`;
                    const [rows9, fields9] = await pool.execute(sql9, [courseID, NewModuleNumber]);
                    const NewModuleID = rows9[0].module_ID;
                    const sql10 = `UPDATE USERS_PROGRESS SET Current_Module_ID = ?, Level = 1 WHERE User_Id = 1 AND Current_Course_ID = ?`;
                    const [rows10, fields10] = await pool.execute(sql10, [NewModuleID, courseID]);
                    return rows10;
                
                }
            }
            else{
                // Update the Subskill to the next Subskill
                NewSubkillNumber = subskillNumber + 1;
                // To find the Subskill ID from the Subskill Number
                console.log('l594');
                const sql8 = `SELECT subskill_ID FROM MODULE_SUBSKILL_LINK
                WHERE module_ID = ? AND subskill_number = ?`;
                const [rows8, fields8] = await pool.execute(sql8, [moduleID, NewSubkillNumber]);
                const NewSubskillID = rows8[0].subskill_ID;
                const sql9 = `UPDATE USERS_PROGRESS SET Current_Subskill_ID = ?, Level = 1 WHERE User_Id = 1 AND Current_Course_ID = ?`;
                const [rows9, fields9] = await pool.execute(sql9, [NewSubskillID, courseID]);
                return rows9;
            }
        }
    }

    // return rows;
}














// ALL EXPORTS
module.exports = {
    getOnlineAssessment,
    getExamTemplate,
    SubmitResponseMapping,
    updateUserProgressForOnlineAssessment,
    updateUserProgressForLearningTest
};