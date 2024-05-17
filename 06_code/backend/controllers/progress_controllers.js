// ALL EXPORTS HERE (for test controllers)


// ALL IMPORTS
const dbOperations = require('../models/progress_models.js');


// export for getting user progress
exports.show_user_progress = async (req, res) => {
    try {
        const returnedData = await dbOperations.showUserProgress();
        console.log(returnedData);

        res.json({ success: true, Progress: returnedData });
    } catch (error) {
        console.error('Failed to get exam template :', error);
        res.json({ success: false, message: 'Failed to get exam template' });
    }
};


// exports for submitting online assessment
exports.submit_online_assessment = async (req, res) => {
    try {
        let jsonString = Object.keys(req.body)[0];
        jsonString = '[' + jsonString + ']';
        const data = JSON.parse(jsonString);
        const evaluation = await dbOperations.evaluateOnlineAssessment(data);

        res.json({ success: true, Evalutaion: evaluation });
    } catch (error) {
        console.error('Failed to get exam template :', error);
        res.json({ success: false, message: 'Failed to get exam template' });
    }
};