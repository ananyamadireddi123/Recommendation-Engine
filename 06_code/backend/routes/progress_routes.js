// the below is to parse multi-part '/' form data
const multer = require('multer');

// IMPORTING CONTROLLERS
const progress_controller = require('../controllers/progress_controllers.js');

// creating a function that takes in the COMMON router for all routes as input
module.exports = (router) => {
    // USER PROGRESS
    router.post('/show_user_progress', multer().none(), progress_controller.show_user_progress);

    router.post('/submit_online_assessment', multer().none(), progress_controller.submit_online_assessment);
}