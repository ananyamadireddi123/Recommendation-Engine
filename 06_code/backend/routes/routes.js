// IMPORTING EXPRESS ROUTER
const router = require('express').Router();

// IMPORTING ALL ROUTES
const courses_routes = require('./courses_routes.js');
const modules_routes = require('./modules_routes.js');
const subskills_routes = require('./subskills_routes.js');
const skilltopics_routes = require('./skilltopics_routes.js');
const linking_routes = require('./linking_routes.js');
const test_routes = require('./test_routes.js');
const progress_routes = require('./progress_routes.js');


// calling functions on them
courses_routes(router);
modules_routes(router);
subskills_routes(router);
skilltopics_routes(router);
linking_routes(router);
test_routes(router);
progress_routes(router);


// exporting a function that takes in express app as input
module.exports = (app) => {
    app.use("/", router);
}   