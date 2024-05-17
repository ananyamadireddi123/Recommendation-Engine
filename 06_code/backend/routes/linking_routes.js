// the below is to parse multi-part '/' form data
const multer = require('multer');

// IMPORTING CONTROLLERS
const linking_controller = require('../controllers/linking_controllers.js');

// creating a function that takes in the COMMON router for all routes as input
module.exports = (router) => {
    // LINKING PAGE
    router.post('/submit_view_modules_in_course', multer().none(), linking_controller.submit_view_modules_in_course);

    router.post('/submit_view_subskills_in_module', multer().none(), linking_controller.submit_view_subskills_in_module);

    router.post('/submit_view_skilltopics_in_subskill', multer().none(), linking_controller.submit_view_skilltopics_in_subskill);

    router.post('/submit_remove_CourseModule_link', multer().none(), linking_controller.submit_remove_CourseModule_link);

    router.post('/submit_remove_ModuleSubskill_link', multer().none(), linking_controller.submit_remove_ModuleSubskill_link);

    router.post('/submit_remove_SubskillSkilltopic_link', multer().none(), linking_controller.submit_remove_SubskillSkilltopic_link);

    router.post('/submit_add_CourseModule_link', multer().none(), linking_controller.submit_add_CourseModule_link);

    router.post('/submit_add_ModuleSubskill_link', multer().none(), linking_controller.submit_add_ModuleSubskill_link);

    router.post('/submit_add_SubskillSkilltopic_link', multer().none(), linking_controller.submit_add_SubskillSkilltopic_link);
}