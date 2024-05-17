// ALL COURSES DB OPS


// ALL IMPORTS
const pool = require('../db_connection');


// ALL FUNCTIONS
async function addCourse(course_name) {
    try {
        const sql = 'INSERT INTO COURSES (course_name) VALUES (?)';
        console.log(course_name);
        const [rows, fields] = await pool.execute(sql, [course_name]);
        console.log("l107")
        console.log(rows)
        return rows;
    } catch (error) {
        console.log("l111")
        console.error("Error executing SQL query:", error);
    }
}

async function getCourses() {
    console.log("line 24 lo unnanu");
    const sql = 'SELECT course_name FROM COURSES';
    const [rows, fields] = await pool.execute(sql);
    console.log("rows = ", rows);
    return rows;
}

async function updateCourse(new_course_name, old_course_name) {
    const sql = 'UPDATE COURSES SET course_name = ? WHERE course_name = ?';
    console.log("l120");
    const [rows, fields] = await pool.execute(sql, [new_course_name, old_course_name]);
    return rows;
}

async function deleteCourse(course_name) {
    const sql = 'DELETE FROM COURSES WHERE course_name = ?';
    const [rows, fields] = await pool.execute(sql, [course_name]);
    return rows;
}

async function getAllCourses() {
    const sql = 'SELECT * FROM COURSES';
    const [rows, fields] = await pool.execute(sql);

    console.log("l31")
    console.log(rows)
    return rows;
}


// ALL EXPORTS
module.exports = {
    addCourse,
    getCourses,
    updateCourse,
    deleteCourse,
    getAllCourses
};