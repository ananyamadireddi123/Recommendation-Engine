// ALL EXPORTS HERE (for linking controllers)


// ALL IMPORTS
const dbOperations = require('../models/linking_models.js');


// export for fetching all modules in a course
exports.submit_view_modules_in_course = async (req, res) => {
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);
        const courseName = requestData.course_name;
        console.log("l527")
        console.log(courseName)

        var rows = await dbOperations.viewModulesInCourse(courseName);
        console.log(rows);
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


// export for fetching all subskills in a module
exports.submit_view_subskills_in_module = async (req, res) => {
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);
        const moduleName = requestData.module_name;
        console.log("l527")
        console.log(moduleName)

        var rows = await dbOperations.viewSubskillsInModule(moduleName);
        console.log(rows);
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


// export for fetching all skilltopics in a subskill
exports.submit_view_skilltopics_in_subskill = async (req, res) => {
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);
        const subskillName = requestData.subskill_name;
        console.log("l527")
        console.log(subskillName)

        var rows = await dbOperations.viewSkilltopicsInSubskill(subskillName);
        console.log(rows);
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


// export for removing course - module link
exports.submit_remove_CourseModule_link = async (req, res) => {
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);

        const Module_name = requestData.module_name;
        const Course_Name = requestData.course_name;
        console.log("LINE 555 APP.JS")
        console.log(Module_name);
        console.log(Course_Name);

        const rows = await dbOperations.Course_Module_link_remove(Course_Name, Module_name);
        if (rows && rows.affectedRows > 0) {
            console.log('Module added to Course successfully');
            res.json({ success: true });
        }
        else {
            console.log("Module could not be added to course")
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Failed to add Module:', error);
        res.json({ success: false, message: 'Failed to add Module' });
    }
};


// export for removing module - subskill link
exports.submit_remove_ModuleSubskill_link = async (req, res) => {
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);

        const Module_name = requestData.Module_name;
        const Subskill_name = requestData.Subskill_name;
        console.log("LINE 605 APP.JS")
        console.log(Module_name);
        console.log(Subskill_name);

        const rows = await dbOperations.Module_Subskill_link_remove(Module_name, Subskill_name);
        if (rows && rows.affectedRows > 0) {
            console.log('Subskill removed from Module successfully');
            res.json({ success: true });
        }
        else {
            console.log("Subskill could not be removed from the Module")
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Failed to add Module:', error);
        res.json({ success: false, message: 'Failed to add Module' });
    }
};


// export for removing subskill - skilltopic link
exports.submit_remove_SubskillSkilltopic_link = async (req, res) => {
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);

        const Subskill_name = requestData.subskill_name;
        const Skilltopic_name = requestData.skilltopic_name;
        console.log("LINE 555 APP.JS")
        console.log(Subskill_name);
        console.log(Skilltopic_name);

        const rows = await dbOperations.Subskill_Skilltopic_link_remove(Subskill_name, Skilltopic_name);
        if (rows && rows.affectedRows > 0) {
            console.log('Skilltopic added to Subskill successfully');
            res.json({ success: true });
        }
        else {
            console.log("Skilltopic could not be added to Subskill")
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Failed to add Skilltopic:', error);
        res.json({ success: false, message: 'Failed to add Skilltopic' });
    }
};


// export for adding course - module link
exports.submit_add_CourseModule_link = async (req, res) => {
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);

        const Module_name = requestData.Module_name;
        const Course_Name = requestData.Course_name;
        const moduleNumber = requestData.moduleNumber;

        console.log(Module_name);
        console.log(Course_Name);
        console.log(moduleNumber)

        const rows = await dbOperations.Course_Module_link(Course_Name, Module_name, moduleNumber);
        if (rows && rows.affectedRows > 0) {
            console.log('Module added to Course successfully');
            res.json({ success: true });
        }
        else {
            console.log("Module could not be added to course")
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Failed to add Module:', error);
        res.json({ success: false, message: 'Failed to add Module' });
    }
};


// export for adding subskill - module link
exports.submit_add_ModuleSubskill_link = async (req, res) => {
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);

        const Module_name = requestData.Module_name;
        const Subskill_Name = requestData.Subskill_name;
        const subskillNumber = requestData.subskillNumber;

        console.log(Module_name);
        console.log(Subskill_Name);
        console.log(subskillNumber)

        const rows = await dbOperations.Module_Subskill_link(Module_name, Subskill_Name, subskillNumber);
        if (rows && rows.affectedRows > 0) {
            console.log('Subkill added to Module successfully');
            res.json({ success: true });
        }
        else {
            console.log("Subkill could not be added to Module")
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Failed to add Subkill:', error);
        res.json({ success: false, message: 'Failed to add Subskill' });
    }
};


// export for adding subskill - skilltopic link
exports.submit_add_SubskillSkilltopic_link = async (req, res) => {
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);

        const Skill_Topic = requestData.Skill_Topic;
        const Subskill_Name = requestData.Subskill_name;
        const skilltopic_number = requestData.skilltopic_number;

        console.log(Skill_Topic);
        console.log(Subskill_Name);
        console.log(skilltopic_number);

        const rows = await dbOperations.Subskill_Skilltopic_link(Subskill_Name, Skill_Topic, skilltopic_number);
        if (rows && rows.affectedRows > 0) {
            console.log('Skilltopic added to Module successfully');
            res.json({ success: true });
        }
        else {
            console.log("Skilltopic could not be added to Subskill")
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Failed to add Skilltopic:', error);
        res.json({ success: false, message: 'Failed to add Skilltopic' });
    }
};