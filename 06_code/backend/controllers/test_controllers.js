// ALL EXPORTS HERE (for test controllers)


// ALL IMPORTS
const dbOperations = require('../models/test_models.js');


// export for getting an online assessment
exports.online_assessment = async (req, res) => {
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);
        const parentName = requestData.parentName;
        const parentType = requestData.parentType;
        console.log('app.js l681 requestData =');
        console.log(requestData);

        const rows = await dbOperations.getOnlineAssessment(parentType, parentName);

    } catch (error) {
        console.error('Failed to add Skilltopic:', error);
        res.json({ success: false, message: 'Failed to add Skilltopic' });
    }
};


// export for getting an exam template
exports.exam_template = async (req, res) => {
    try {
        const requestData = JSON.parse(Object.keys(req.body)[0]);
        const template_id = requestData.template_id;

        console.log('l32 requestData =');
        console.log(requestData);

        const Questions = await dbOperations.getExamTemplate(template_id);
        console.log("l36 Questions = ", Questions);
        res.json({ success: true, Questions: Questions });
    } catch (error) {
        console.error('Failed to get exam template :', error);
        res.json({ success: false, message: 'Failed to get exam template' });
    }
};

exports.submit_response_mapping = async (req, res) => {
    try {
        response_mapping = req.body;
        console.log("LINE 47 TEST_CONTROLLERS.JS ")
        const Results = await dbOperations.SubmitResponseMapping(response_mapping);
        console.log(Results);
        
        //console.log(Result);
        res.json( {success: true, message: "Response mapped successfully",data: Results });


    } catch (error) {
        console.error('Failed to map response :', error);
        res.json({ success: false, message: 'Failed to map response' });
    }
}

exports.passed_online_assessment = async (req, res) => {
    try {
        const module_failed = req.body.module_failed;
        const result = await dbOperations.updateUserProgressForOnlineAssessment(module_failed);
        res.json({success: true, message: 'passed online assessment handled successfully'});
    } catch (error) {
        console.log("Failed to handle passed online assessment: ", error);
        res.json({ success: false, message: 'Failed to handle passed online assessment' });

    }
}

exports.passed_learning_test = async (req, res) => {
    try {
        console.log("LINE 75 TEST_CONTROLLERS.JS  req.body = ", req.body);
        const passed_learning_test_flag = Number(Object.keys(req.body)[0]);
        console.log("LINE 77 TEST_CONTROLLERS.JS  passed_learning_test_flag = ", passed_learning_test_flag);
        const result = await dbOperations.updateUserProgressForLearningTest(passed_learning_test_flag);
        res.json({success: true, message: 'passed learning test handled successfully'});

    } catch (error) { console.log("Failed to handle passed learning test: ", error);
     res.json({success: false, message: 'Failed to handle passed learning test'});
    }
}