// ALL EXPORTS HERE (for modules controllers)


// ALL IMPORTS
const dbOperations = require('../models/modules_models.js');


// export for fetching all modules
exports.getModules = async (req, res) => {
    try {
        const modules = await dbOperations.getModules();
        res.json({ modules });
    } catch (error) {
        console.error('Failed to fetch modules:', error);
        res.status(500).json({ error: 'Failed to fetch modules' });
    }
};


// export for adding a module
exports.submit_add_module = async (req, res) => {
    let operation;
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);

        const ModuleName = requestData.Module_name;


        console.log(ModuleName);

        operation = await dbOperations.addModule(ModuleName);
        // console.log(operation);
        if (operation && operation.affectedRows > 0) {

            console.log('APP.JS LINE 31 - Module added successfully');
            res.json(operation);
        }
        else {
            console.error("APP.JS LINE 32 - Module failed")
            res.json(operation)
        }

    } catch (error) {
        console.log("LINE 41")
        console.error('APP.JS LINE 41 Failed to add Module:');
        res.json(operation);
    }
};


// export for deleting a module
exports.submit_delete_module = async (req, res) => {
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);

        const ModuleName = requestData.Module_name;

        console.log(ModuleName);

        const affected_rows = await dbOperations.deleteModule(ModuleName);
        if (affected_rows) {
            console.log('Module deleted successfully');
            res.json({ success: true });
        }
        else {
            console.log("Module Not Found")
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Failed to delete Module:', error);
        res.json({ success: false, message: 'Failed to delete Module' });
    }
};


// export for updating a module
exports.submit_update_module = async (req, res) => {
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);

        const Module_name_old = requestData.Module_name_old;
        const Module_name_new = requestData.Module_name_new;

        console.log(Module_name_new);
        const affected_rows = await dbOperations.updateModule(Module_name_new, Module_name_old);
        if (affected_rows) {
            console.log('Module updated successfully');
            res.json({ success: true });
        }
        else {
            console.log("Module Not Found")
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Failed to update Module:', error);
        res.json({ success: false, message: 'Failed to Update Module' });
    }
};


// export for reading all modules
exports.submit_read_modules = async (req, res) => {
    try {
        console.log("YOYOY2");
        var rows = await dbOperations.getAllModules();
        if (rows.length) {
            res.json({ success: true, rows: rows });
        }
        else {
            res.json({ success: false, rows: null })
        }

    } catch (error) {
        console.error('Failed to read Modules:', error);
        res.json({ success: false, message: 'Failed to read Modules' });
    }
};