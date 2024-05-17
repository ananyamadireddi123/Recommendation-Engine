// the below is to parse multi-part '/' form data
const multer = require('multer');

// IMPORTING CONTROLLERS
const test_controller = require('../controllers/test_controllers.js');

// creating a function that takes in the COMMON router for all routes as input
module.exports = (router) => {
    // ONLINE ASSESSMENT
    router.post('/online_assessment', multer().none(), test_controller.online_assessment);
    router.post('/exam_template', multer().none(), test_controller.exam_template);
    router.post('/submit_response_mapping', multer().none(), test_controller.submit_response_mapping);
    router.post('/passed_online_assessment', multer().none(), test_controller.passed_online_assessment);
    router.post('/passed_learning_test', multer().none(), test_controller.passed_learning_test);
}