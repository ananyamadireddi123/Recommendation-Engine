// the below is to parse multi-part '/' form data
const multer = require('multer');

// IMPORTING CONTROLLERS
const skilltopic_controller = require('../controllers/skilltopics_controllers.js');

// creating a function that takes in the COMMON router for all routes as input
module.exports = (router) => {
    // SKILLTOPICS
    router.get('/getSkilltopics', skilltopic_controller.getSkilltopics);

    router.post('/submit_add_skilltopic', multer().none(), skilltopic_controller.submit_add_skilltopic);

    router.post('/submit_delete_skilltopic', multer().none(), skilltopic_controller.submit_delete_skilltopic);

    router.post('/submit_update_skilltopic', multer().none(), skilltopic_controller.submit_update_skilltopic);

    router.post('/submit_read_skilltopics', multer().none(), skilltopic_controller.submit_read_skilltopics);
}