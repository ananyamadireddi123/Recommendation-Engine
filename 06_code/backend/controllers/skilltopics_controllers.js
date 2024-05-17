// ALL EXPORTS HERE (for skilltopics controllers)


// ALL IMPORTS
const dbOperations = require('../models/skilltopics_models.js');


// export for fetching all skilltopics
exports.getSkilltopics = async (req, res) => {
    try {
        const skilltopics = await dbOperations.getSkilltopics();
        res.json({ skilltopics });
    } catch (error) {
        console.error('Failed to fetch courses:', error);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
};


// export for adding a skilltopic
exports.submit_add_skilltopic = async (req, res) => {
    let operation;
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);

        const skillName = requestData.skilltopic_name;


        console.log(skillName);

        operation = await dbOperations.addSkilltopics(skillName);
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


// export for deleting a skilltopic
exports.submit_delete_skilltopic = async (req, res) => {
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);

        const skillName = requestData.skilltopic_name;

        console.log(skillName);

        const affected_rows = await dbOperations.deleteSkilltopics(skillName);
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


// export for updating a skilltopic
exports.submit_update_skilltopic = async (req, res) => {
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);

        const skill_name_old = requestData.skilltopic_name_old;
        const skill_name_new = requestData.skilltopic_name_new;

        console.log(skill_name_new);
        const affected_rows = await dbOperations.updateSkilltopics(skill_name_new, skill_name_old);
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


// export for reading all skilltopics
exports.submit_read_skilltopics = async (req, res) => {
    try {

        var rows = await dbOperations.getAllSkilltopics();
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