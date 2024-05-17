// the below is to parse multi-part '/' form data
const multer = require('multer');

// IMPORTING CONTROLLERS
const course_controller = require('../controllers/courses_controllers.js');

// creating a function that takes in the COMMON router for all routes as input
module.exports = (router) => {
    // COURSES
    router.get('/getCourses', course_controller.getCourses);

    router.post('/submit_add_course', multer().none(), course_controller.submit_add_course);

    router.post('/submit_delete_course', multer().none(), course_controller.submit_delete_course);

    router.post('/submit_update_course', multer().none(), course_controller.submit_update_course);

    router.post('/submit_read_courses', multer().none(), course_controller.submit_read_courses);
}