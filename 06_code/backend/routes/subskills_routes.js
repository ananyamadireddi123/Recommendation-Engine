// the below is to parse multi-part '/' form data
const multer = require('multer');

// IMPORTING CONTROLLERS
const subskill_controller = require('../controllers/subskills_controllers.js');

// creating a function that takes in the COMMON router for all routes as input
module.exports = (router) => {
    // SUBSKILLS
    router.get('/getSubskills', subskill_controller.getSubskills);

    router.post('/submit_add_subskill', multer().none(), subskill_controller.submit_add_subskill);

    router.post('/submit_delete_subskill', multer().none(), subskill_controller.submit_delete_subskill);

    router.post('/submit_update_subskill', multer().none(), subskill_controller.submit_update_subskill);

    router.post('/submit_read_subskills', multer().none(), subskill_controller.submit_read_subskills);
}