// ALL EXPORTS HERE (for courses controllers)


// ALL IMPORTS
const dbOperations = require('../models/courses_models.js');


// export for fetching all courses
exports.getCourses = async (req, res) => {
    try {
        console.log("RANDOME");
        const courses = await dbOperations.getCourses();
        res.json({ courses });
    } catch (error) {
        console.error('Failed to fetch courses:', error);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
};


// export for adding a course
exports.submit_add_course = async (req, res) => {
    let operation;
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);

        const courseName = requestData.course_name;


        console.log(courseName);

        operation = await dbOperations.addCourse(courseName);
        // console.log(operation);
        if (operation && operation.affectedRows > 0) {

            console.log('APP.JS LINE 31 - Course added successfully');
            res.json(operation);
        }
        else {
            console.error("APP.JS LINE 32 - Course failed")
            res.json(operation)
        }

    } catch (error) {
        console.log("LINE 41")
        console.error('APP.JS LINE 41 Failed to add course:');
        res.json(operation);
    }
};


// export for deleting a course
exports.submit_delete_course = async (req, res) => {
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);

        const courseName = requestData.course_name;

        console.log(courseName);

        const affected_rows = await dbOperations.deleteCourse(courseName);
        if (affected_rows) {
            console.log('Course deleted successfully');
            res.json({ success: true });
        }
        else {
            console.log("Course Not Found")
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Failed to delete course:', error);
        res.json({ success: false, message: 'Failed to delete course' });
    }
};


// export for updating a course
exports.submit_update_course = async (req, res) => {
    try {
        const { course_name_old, course_name_new } = req.body;

        console.log(course_name_new);
        const affected_rows = await dbOperations.updateCourse(course_name_new, course_name_old);
        if (affected_rows) {
            console.log('Course updated successfully');
            res.json({ success: true });
        }
        else {
            console.log("Course Not Found")
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Failed to update course:', error);
        res.json({ success: false, message: 'Failed to Update course' });
    }
};


// export for reading all courses
exports.submit_read_courses = async (req, res) => {
    try {

        var rows = await dbOperations.getAllCourses();
        if (rows.length) {
            res.json({ success: true, rows: rows });
        }
        else {
            res.json({ success: false, rows: null })
        }

    } catch (error) {
        console.error('Failed to read courses:', error);
        res.json({ success: false, message: 'Failed to read courses' });
    }
};