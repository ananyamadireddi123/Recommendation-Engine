// ALL SUBSKILLS DB OPS


// ALL IMPORTS
const pool = require('../db_connection');


// ALL FUNCTIONS
async function getSubskills() {
    const sql = 'SELECT subskill_name FROM SUBSKILLS';
    const [rows, fields] = await pool.execute(sql);
    return rows;
}

async function addSubskills(subskill_name) {
    const sql = 'INSERT INTO SUBSKILLS (subskill_name) VALUES (?)';
    const [rows, fields] = await pool.execute(sql, [subskill_name]);
    console.log("l9")
    console.log(rows)
    return rows;
}

async function updateSubskills(new_subskill_name, old_subskill_name) {
    const sql = 'UPDATE SUBSKILLS SET subskill_name = ? WHERE subskill_name = ?';
    const [rows, fields] = await pool.execute(sql, [new_subskill_name, old_subskill_name]);
    return rows;
}

async function deleteSubskills(subskill_name) {
    const sql = 'DELETE FROM SUBSKILLS WHERE subskill_name = ?';
    const [rows, fields] = await pool.execute(sql, [subskill_name]);
    return rows;
}

async function getAllSubskills() {
    const sql = 'SELECT * FROM SUBSKILLS';
    const [rows, fields] = await pool.execute(sql);

    console.log("l31")
    console.log(rows)
    return rows;
}

// ALL EXPORTS
module.exports = {
    getSubskills,
    addSubskills,
    updateSubskills,
    deleteSubskills,
    getAllSubskills
};