// ALL EXPORTS HERE (for subskills controllers)


// ALL IMPORTS
const dbOperations = require('../models/subskills_models.js');


// export for fetching all subskills
exports.getSubskills = async (req, res) => {
    try {
        const subskills = await dbOperations.getSubskills();
        res.json({ subskills });
    } catch (error) {
        console.error('Failed to fetch courses:', error);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
};


// export for adding a subskill
exports.submit_add_subskill = async (req, res) => {
    let operation;
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);

        const skillName = requestData.skill_name;


        console.log(skillName);

        operation = await dbOperations.addSubskills(skillName);
        // console.log(operation);
        if (operation && operation.affectedRows > 0) {

            console.log('APP.JS LINE 31 - skill added successfully');
            res.json(operation);
        }
        else {
            console.error("APP.JS LINE 32 - skill failed")
            res.json(operation)
        }

    } catch (error) {
        console.log("LINE 41")
        console.error('APP.JS LINE 41 Failed to add skill:');
        res.json(operation);
    }
};


// export for deleting a subskill
exports.submit_delete_subskill = async (req, res) => {
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);

        const skillName = requestData.skill_name;

        console.log(skillName);

        const affected_rows = await dbOperations.deleteSubskills(skillName);
        if (affected_rows) {
            console.log('skill deleted successfully');
            res.json({ success: true });
        }
        else {
            console.log("skill Not Found")
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Failed to delete skill:', error);
        res.json({ success: false, message: 'Failed to delete skill' });
    }
};


// export for updating a subskill
exports.submit_update_subskill = async (req, res) => {
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);

        const skill_name_old = requestData.skill_name_old;
        const skill_name_new = requestData.skill_name_new;

        console.log(skill_name_new);
        const affected_rows = await dbOperations.updateSubskills(skill_name_new, skill_name_old);
        if (affected_rows) {
            console.log('skill updated successfully');
            res.json({ success: true });
        }
        else {
            console.log("skill Not Found")
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Failed to update skill:', error);
        res.json({ success: false, message: 'Failed to Update skill' });
    }
};


// export for reading all subskills
exports.submit_read_subskills = async (req, res) => {
    try {

        var rows = await dbOperations.getAllSubskills();
        // console.log(rows);
        if (rows.length) {
            res.json({ success: true, rows: rows });
        }
        else {
            res.json({ success: false, rows: null })
        }

    } catch (error) {
        console.error('Failed to read skills:', error);
        res.json({ success: false, message: 'Failed to read skills' });
    }
};