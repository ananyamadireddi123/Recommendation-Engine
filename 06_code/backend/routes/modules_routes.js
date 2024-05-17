// the below is to parse multi-part '/' form data
const multer = require('multer');

// IMPORTING CONTROLLERS
const module_controller = require('../controllers/modules_controllers.js');

// creating a function that takes in the COMMON router for all routes as input
module.exports = (router) => {
    // MODULES
    router.get('/getModules', module_controller.getModules);

    router.post('/submit_add_module', multer().none(), module_controller.submit_add_module);

    router.post('/submit_delete_module', multer().none(), module_controller.submit_delete_module);

    router.post('/submit_update_module', multer().none(), module_controller.submit_update_module);

    router.post('/submit_read_modules', multer().none(), module_controller.submit_read_modules);
}