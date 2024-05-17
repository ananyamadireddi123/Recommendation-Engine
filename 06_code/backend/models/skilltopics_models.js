// ALL SKILLTOPICS DB OPS


// ALL IMPORTS
const pool = require('../db_connection');


// ALL FUNCTIONS
async function getSkilltopics() {
    const sql = 'SELECT skilltopic_name FROM SKILLTOPICS';
    const [rows, fields] = await pool.execute(sql);
    return rows;
}

async function addSkilltopics(skilltopic_name) {
    const sql = 'INSERT INTO SKILLTOPICS (skilltopic_name) VALUES (?)';
    const [rows, fields] = await pool.execute(sql, [skilltopic_name]);
    console.log("l9")
    console.log(rows)
    return rows;
}

async function updateSkilltopics(new_skilltopic_name, old_skilltopic_name) {
    const sql = 'UPDATE SKILLTOPICS SET skilltopic_name = ? WHERE skilltopic_name = ?';
    const [rows, fields] = await pool.execute(sql, [new_skilltopic_name, old_skilltopic_name]);
    return rows;
}

async function deleteSkilltopics(skilltopic_name) {
    const sql = 'DELETE FROM SKILLTOPICS WHERE skilltopic_name = ?';
    const [rows, fields] = await pool.execute(sql, [skilltopic_name]);
    return rows;
}

async function getAllSkilltopics() {
    const sql = 'SELECT * FROM SKILLTOPICS';
    const [rows, fields] = await pool.execute(sql);

    console.log("l31")
    console.log(rows)
    return rows;
}


// ALL EXPORTS
module.exports = {
    getSkilltopics,
    addSkilltopics,
    updateSkilltopics,
    deleteSkilltopics,
    getAllSkilltopics
};