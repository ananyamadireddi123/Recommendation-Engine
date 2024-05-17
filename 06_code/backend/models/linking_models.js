// ALL LINKING DB OPS


// ALL IMPORTS
const pool = require('../db_connection');


// ALL FUNCTIONS
async function Course_Module_link(coursename, modulename, modulenumber) {

    const checkSql = `
    SELECT ID, module_number
    FROM COURSE_MODULE_LINK
    WHERE course_ID = (SELECT ID FROM COURSES WHERE course_name = ?)
    AND module_number = ?`;

    const [checkRows, checkFields] = await pool.execute(checkSql, [coursename, modulenumber]);

    console.log("checkRows is: ")
    console.log(checkRows);

    // module with that index exists already
    // incerment all module numbers >= module_number by 1 
    if (checkRows.length > 0) {
        const updateSql = `
        UPDATE COURSE_MODULE_LINK
        SET module_number = module_number + 1
        WHERE course_ID = (SELECT ID FROM COURSES WHERE course_name = ?)
        AND module_number >= ?`;

        await pool.execute(updateSql, [coursename, modulenumber]);

        console.log(`Modules with module_number > ${modulenumber} have been updated.`)

    }
    // no module with that index exists
    const sql = `INSERT INTO COURSE_MODULE_LINK (course_ID, module_ID, module_number)
    VALUES (
      (SELECT ID FROM COURSES WHERE course_name = ?),
      (SELECT ID FROM MODULES WHERE module_name = ?),
      ?
    )`;

    const [rows, fields] = await pool.execute(sql, [coursename, modulename, modulenumber]);
    console.log("l231")
    console.log(rows)
    return rows;
}

async function Course_Module_link_remove(coursename, modulename) {

    const querySql = `SELECT module_number
    FROM COURSE_MODULE_LINK
    WHERE course_ID = (SELECT ID FROM COURSES WHERE course_name = ?)
    AND module_ID = (SELECT ID FROM MODULES WHERE module_name = ?)`
    const [queryrows, queryfields] = await pool.execute(querySql, [coursename, modulename])
    if (queryrows.length == 0) {
        return null;
    }
    const modulenumber = queryrows[0].module_number
    console.log(`modulexnumber = ${modulenumber}`)

    const removeSql = `
    DELETE FROM COURSE_MODULE_LINK
    WHERE module_ID = (SELECT ID FROM MODULES WHERE module_name = ?)
    AND course_ID = (SELECT ID FROM COURSES WHERE course_name = ?)`;

    const [rows, fields] = await pool.execute(removeSql, [modulename, coursename]);


    console.log(rows)
    const updateSql = `
    UPDATE COURSE_MODULE_LINK
    SET module_number = module_number - 1
    WHERE course_ID = (SELECT ID FROM COURSES WHERE course_name = ?)
    AND module_number > ?`;

    await pool.execute(updateSql, [coursename, modulenumber]);


    return rows;
}


async function Module_Subskill_link(modulename, subskillname, subskillnumber) {
    const checkSql = `
    SELECT ID, subskill_number
    FROM MODULE_SUBSKILL_LINK
    WHERE module_ID = (SELECT ID FROM MODULES WHERE module_name = ?)
    AND subskill_number = ?`;

    const [checkRows, checkFields] = await pool.execute(checkSql, [modulename, subskillnumber]);

    console.log("checkRows is: ")
    console.log(checkRows);

    // subskill with that index exists already
    // incerment all subskill numbers >= subskill_number by 1 
    if (checkRows.length > 0) {
        const updateSql = `
        UPDATE MODULE_SUBSKILL_LINK
        SET subskill_number = subskill_number + 1
        WHERE module_ID = (SELECT ID FROM MODULES WHERE module_name = ?)
        AND subskill_number >= ?`;

        await pool.execute(updateSql, [modulename, subskillnumber]);

        console.log(`subskills with subskill_number > ${subskillnumber} have been updated.`)

    }
    // no subskill with that index exists
    const sql = `INSERT INTO MODULE_SUBSKILL_LINK (module_ID, subskill_ID, subskill_number)
    VALUES (
      (SELECT ID FROM MODULES WHERE module_name = ?),
      (SELECT ID FROM SUBSKILLS WHERE subskill_name = ?),
      ?
    )`;

    const [rows, fields] = await pool.execute(sql, [modulename, subskillname, subskillnumber]);
    console.log("l231")
    console.log(rows)
    return rows;
}

async function Module_Subskill_link_remove(modulename, subskillname) {
    const querySql = `SELECT subskill_number
    FROM MODULE_SUBSKILL_LINK
    WHERE module_ID = (SELECT ID FROM MODULES WHERE module_name = ?)
    AND subskill_ID = (SELECT ID FROM SUBSKILLS WHERE subskill_name = ?)`
    const [queryrows, queryfields] = await pool.execute(querySql, [modulename, subskillname])
    if (queryrows.length == 0) {
        return null;
    }
    const subskillnumber = queryrows[0].subskill_number
    console.log(`subskillxnumber = ${subskillnumber}`)

    const removeSql = `
    DELETE FROM MODULE_SUBSKILL_LINK
    WHERE subskill_ID = (SELECT ID FROM SUBSKILLS WHERE subskill_name = ?)
    AND module_ID = (SELECT ID FROM MODULES WHERE module_name = ?)`;

    const [rows, fields] = await pool.execute(removeSql, [subskillname, modulename]);

    console.log(rows)
    const updateSql = `
    UPDATE MODULE_SUBSKILL_LINK
    SET subskill_number = subskill_number - 1
    WHERE module_ID = (SELECT ID FROM MODULES WHERE module_name = ?)
    AND subskill_number > ?`;

    await pool.execute(updateSql, [modulename, subskillnumber]);


    return rows;
}

async function Subskill_Skilltopic_link(subskillname, skilltopicname, skilltopicnumber) {
    const checkSql = `
    SELECT ID, skilltopic_number
    FROM SUBSKILL_SKILLTOPIC_LINK
    WHERE subskill_ID = (SELECT ID FROM SUBSKILLS WHERE subskill_name = ?)
    AND skilltopic_number = ?`;

    const [checkRows, checkFields] = await pool.execute(checkSql, [subskillname, skilltopicnumber]);

    console.log("checkRows is: ")
    console.log(checkRows);

    // subskill with that index exists already
    // incerment all subskill numbers >= subskill_number by 1 
    if (checkRows.length > 0) {
        const updateSql = `
        UPDATE SUBSKILL_SKILLTOPIC_LINK
        SET skilltopic_number = skilltopic_number + 1
        WHERE subskill_ID = (SELECT ID FROM SUBSKILLS WHERE subskill_name = ?)
        AND skilltopic_number >= ?`;

        await pool.execute(updateSql, [subskillname, skilltopicnumber]);

        console.log(`subskills with subskill_number > ${skilltopicnumber} have been updated.`)

    }
    // no subskill with that index exists
    const sql = `INSERT INTO SUBSKILL_SKILLTOPIC_LINK (subskill_ID, skilltopic_ID, skilltopic_number)
    VALUES (
      (SELECT ID FROM SUBSKILLS WHERE subskill_name = ?),
      (SELECT ID FROM SKILLTOPICS WHERE skilltopic_name = ?),
      ?
    )`;

    const [rows, fields] = await pool.execute(sql, [subskillname, skilltopicname, skilltopicnumber]);
    console.log("l231")
    console.log(rows)
    return rows;
}

async function Subskill_Skilltopic_link_remove(subskillname, skilltopicname) {
    const querySql = `SELECT skilltopic_number
    FROM SUBSKILL_SKILLTOPIC_LINK
    WHERE subskill_ID = (SELECT ID FROM SUBSKILLS WHERE subskill_name = ?)
    AND skilltopic_ID = (SELECT ID FROM SKILLTOPICS WHERE skilltopic_name = ?)`
    const [queryrows, queryfields] = await pool.execute(querySql, [subskillname, skilltopicname])
    if (queryrows.length == 0) {
        return null;
    }
    const skilltopicnumber = queryrows[0].skilltopic_number
    console.log(`skilltopicxnumber = ${skilltopicnumber}`)

    const removeSql = `
    DELETE FROM SUBSKILL_SKILLTOPIC_LINK
    WHERE skilltopic_ID = (SELECT ID FROM SKILLTOPICS WHERE skilltopic_name = ?)
    AND subskill_ID = (SELECT ID FROM SUBSKILLS WHERE subskill_name = ?)`;

    const [rows, fields] = await pool.execute(removeSql, [skilltopicname, subskillname]);

    console.log(rows)
    const updateSql = `
    UPDATE SUBSKILL_SKILLTOPIC_LINK
    SET skilltopic_number = skilltopic_number - 1
    WHERE subskill_ID = (SELECT ID FROM SUBSKILLS WHERE subskill_name = ?)
    AND skilltopic_number > ?`;

    await pool.execute(updateSql, [subskillname, skilltopicnumber]);


    return rows;
}

async function viewModulesInCourse(courseName) {
    const sql = `SELECT M.module_name, CM.module_number
    FROM COURSES C
    JOIN COURSE_MODULE_LINK CM ON C.ID = CM.course_ID
    JOIN MODULES M ON CM.module_ID = M.ID
    WHERE C.course_name = ?`;
    const [rows, fields] = await pool.execute(sql,
        [courseName]);

    console.log(rows)
    return rows;
}

async function viewSubskillsInModule(moduleName) {
    console.log(moduleName)
    console.log(typeof (moduleName))

    const sql = `SELECT SS.subskill_name, MS.subskill_number
    FROM MODULES M
    JOIN MODULE_SUBSKILL_LINK MS ON M.ID = MS.module_ID
    JOIN SUBSKILLS SS ON MS.subskill_ID = SS.ID
    WHERE M.module_name = ?`;
    const [rows, fields] = await pool.execute(sql,
        [moduleName]);

    console.log(rows)
    return rows;
}

async function viewSkilltopicsInSubskill(subskillName) {
    console.log(subskillName)
    console.log(typeof (subskillname))

    const sql = `SELECT ST.skilltopic_name, SST.skilltopic_number
    FROM SUBSKILLS S
    JOIN SUBSKILL_SKILLTOPIC_LINK SST ON S.ID = SST.subskill_ID
    JOIN SKILLTOPICS ST ON SST.skilltopic_ID = ST.ID
    WHERE S.subskill_name = ?`;
    const [rows, fields] = await pool.execute(sql,
        [subskillName]);
    console.log("l412")
    console.log(rows)
    return rows;
}


// ALL EXPORTS
module.exports = {
    Course_Module_link,
    Module_Subskill_link,
    Subskill_Skilltopic_link,

    Course_Module_link_remove,
    Module_Subskill_link_remove,
    Subskill_Skilltopic_link_remove,

    viewModulesInCourse,
    viewSubskillsInModule,
    viewSkilltopicsInSubskill
};