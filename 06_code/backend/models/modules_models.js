// ALL MODULES DB OPS 


// ALL IMPORTS
const pool = require('../db_connection');


// ALL FUNCTIONS
async function getModules() {
    const sql = 'SELECT module_name FROM MODULES';
    const [rows, fields] = await pool.execute(sql);
    return rows;
}

async function addModule(module_name) {
    const sql = 'INSERT INTO MODULES (module_name) VALUES (?)';
    console.log('l144');
    const [rows, fields] = await pool.execute(sql, [module_name]);
    console.log("l9")
    console.log(rows)
    return rows;
}

async function updateModule(new_module_name, old_module_name) {
    const sql = 'UPDATE MODULES SET module_name = ? WHERE module_name = ?';
    const [rows, fields] = await pool.execute(sql, [new_module_name, old_module_name]);
    return rows;
}

async function deleteModule(module_name) {
    const sql = 'DELETE FROM MODULES WHERE module_name = ?';
    const [rows, fields] = await pool.execute(sql, [module_name]);
    return rows;
}

async function getAllModules() {
    const sql = 'SELECT * FROM MODULES';
    const [rows, fields] = await pool.execute(sql);

    console.log("l31")
    console.log(rows)
    return rows;
}


// ALL EXPORTS
module.exports = {
    getModules,
    addModule,
    updateModule,
    deleteModule,
    getAllModules
};