// O(n*m)
function subsetSumForTarget(nums, target) {
    const dp = Array(nums.length + 1).fill().map(() => Array(target + 1).fill(false));

    // dp[i][j] => sum = j for a subset of array[1...i]

    // Base case: if target is 0, it is always possible to obtain it using an empty subset
    for (let i = 0; i <= nums.length; i++) {
        dp[i][0] = true;
    }

    for (let i = 1; i <= nums.length; i++) {
        for (let j = 1; j <= target; j++) {
            // If the current target sum 'j' is less than the current number 'nums[i - 1]',
            // it means including 'nums[i - 1]' in the subset would exceed the target sum.
            if (j < nums[i - 1]) {
                // In this case, we inherit the possibility from the previous row for the same sum 'j'.
                dp[i][j] = dp[i - 1][j];
            }
            // Otherwise, if including 'nums[i - 1]' in the subset is feasible for achieving the sum 'j',
            // we check if it's possible to obtain the sum 'j' by either including or excluding 'nums[i - 1]'.
            else {
                // If it's possible to obtain the sum 'j' without including 'nums[i - 1]' (from the previous row),
                // or if it's possible to obtain the remaining sum 'j - nums[i - 1]' after including 'nums[i - 1]',
                // then it's possible to obtain the sum 'j' with the current set of numbers.
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
            }
        }
    }

    // If dp[nums.length][target] is false, it means there's no subset sum equal to target
    if (!dp[nums.length][target]) {
        return null;
    }
    // console.log("dp = ");
    // console.log(dp);
    // Reconstruct the subset that sums up to the target
    const subset = [];
    let i = nums.length, j = target;
    while (i > 0 && j > 0) {
        if (dp[i - 1][j]) {
            i--;
        } else {
            subset.push(nums[i - 1]);
            j -= nums[i - 1];
            i--;
        }
    }

    return subset;
}

// O(n*m^2)
function selectQuestionTimesForLevel(listOfQuestionIDs, listOfQuestionTimes, minTotalTime, maxTotalTime) {
    const listOfSubsets = [];
    for (let totalTime = minTotalTime; totalTime <= maxTotalTime; totalTime++) {
        const subsetOfQuestionIDs = subsetSumForTarget(listOfQuestionTimes, totalTime);
        if (subsetOfQuestionIDs != null) {
            listOfSubsets.push(subsetOfQuestionIDs);
        }
    }
    if (listOfSubsets.length === 0) {
        return null;
    }
    const selectedSubset = listOfSubsets[Math.floor(Math.random() * listOfSubsets.length)];
    return selectedSubset;
}

function fisherYatesShuffleAlgorithm(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function selectQuestionIDsForLevel(listOfQuestionIDs, listOfQuestionTimes, selectedListOfQuestionTimes) {
    let mapOfSelectedQuestionTimes = new Map();
    if(selectedListOfQuestionTimes!=null){
    selectedListOfQuestionTimes.forEach(questionTime => {
        console.log("some error")
       
        console.log("questionTime",questionTime)
        if (mapOfSelectedQuestionTimes.has(questionTime)) {
            mapOfSelectedQuestionTimes.set(questionTime, mapOfSelectedQuestionTimes.get(questionTime) + 1);
        }
        else {
            mapOfSelectedQuestionTimes.set(questionTime, 1);
        }

    });
}
    // mapOfQuestionIDs[questionTime] = [QID1, ..., QIDn]
    let mapOfQuestionIDs = new Map();
    for (let i = 0; i < listOfQuestionIDs.length; i++) {
        const questionID = listOfQuestionIDs[i];
        const questionTime = listOfQuestionTimes[i];

        if (mapOfQuestionIDs.has(questionTime)) {
            let existingQuestionIDs = mapOfQuestionIDs.get(questionTime);
            existingQuestionIDs.push(questionID);
            mapOfQuestionIDs.set(questionTime, existingQuestionIDs);
        }
        else {
            mapOfQuestionIDs.set(questionTime, [questionID]);
        }
    }

    const listOfSelectedQuestionIDs = []
    // for each questionTime and its number of repititons
    for (const [questionTime, numberOfQuestions] of mapOfSelectedQuestionTimes) {

        let listOfQuestionIDsForQuestionTime = [...mapOfQuestionIDs.get(questionTime)];
        listOfQuestionIDsForQuestionTime = fisherYatesShuffleAlgorithm(listOfQuestionIDsForQuestionTime);
        let sliceOfQuestionIDs = listOfQuestionIDsForQuestionTime.slice(0, numberOfQuestions);
        listOfSelectedQuestionIDs.push(...sliceOfQuestionIDs);
    }
    return listOfSelectedQuestionIDs;
}

function generateQuestions(listOfQuestionIDs, listOfLevels, listOfQuestionTimes, minTotalTime, maxTotalTime, distributionOfLevels) {
    if(listOfLevels.length === 0) {
        return [];
    }
    minTotalTime = Math.floor(minTotalTime);
    maxTotalTime = Math.ceil(maxTotalTime);
    // uniqueLevels = [1, ..., n]
    const uniqueLevels = [...new Set(listOfLevels)].sort((a, b) => a - b);
    // sortedQuestionIDs[i][j] = jth QID with level i
    // console.log("LINE 122 listOfLevels = ", listOfLevels);
    // console.log("distibutionOfLevels = ", distributionOfLevels);
    const sortedQuestionIDs = [];
    const sortedQuestionTimes = [];
    for (let i = 0; i < uniqueLevels.length + 1; i++) {
        const level = uniqueLevels[i];
        sortedQuestionIDs[level] = []; // Initialize each row as an empty array
        sortedQuestionTimes[level] = [];
    }
    for (let i = 0; i < listOfQuestionIDs.length; i++) {
        const questionID = listOfQuestionIDs[i];
        const level = listOfLevels[i];
        const questionTime = listOfQuestionTimes[i];

        for (let j = 0; j < uniqueLevels.length; j++) {
            if (level === uniqueLevels[j]) {
                sortedQuestionIDs[level].push(questionID);
                sortedQuestionTimes[level].push(questionTime);
                break;
            }
        }
    }
    // for each levelarray, obtain the time limits
    minLevelTimeArray = Array(Math.max(...uniqueLevels) + 1).fill(minTotalTime);
    maxLevelTimeArray = Array(Math.max(...uniqueLevels) + 1).fill(maxTotalTime);

    for (let i = 0; i < uniqueLevels.length; i++) {
        const level = uniqueLevels[i];
        const alpha = distributionOfLevels[level] / 100;
        // console.log("alpha = ", alpha, " for level = ", level);
        minLevelTimeArray[level] = Math.floor(alpha * minLevelTimeArray[level]);
        maxLevelTimeArray[level] = Math.ceil(alpha * maxLevelTimeArray[level]);


    }
    // console.log("LINE 156 RANDOMQGEN.JS");
    // console.log(minLevelTimeArray);
    // console.log(maxLevelTimeArray);

    // compute list of question for each level
    const generatedQuestions = [];
    for (let i = 0; i < generatedQuestions.length; i++) {
        generatedQuestions[i] = [];
    }
    console.log(uniqueLevels);
    for (let i = 0; i < uniqueLevels.length; i++) {
        let level = uniqueLevels[i];
        // console.log(sortedQuestionIDs[level]);
        // console.log(sortedQuestionTimes[level]);
        // console.log(minLevelTimeArray[level]);
        // console.log(maxLevelTimeArray[level]);
        const selectedQuestionTimes = selectQuestionTimesForLevel(sortedQuestionIDs[level], sortedQuestionTimes[level], minLevelTimeArray[level], maxLevelTimeArray[level]);
        
        // if selectedQuestionTimes is null, then it is not possible to generate questions for the level
        // hence, return null for the entire list
        if (selectedQuestionTimes == null) {
            // returning an empty list to test_models.j
            return [];
        }
        generatedQuestions[level] = selectQuestionIDsForLevel(sortedQuestionIDs[level], sortedQuestionTimes[level], selectedQuestionTimes);

        // console.log("LINE 174 level = ", level);
        // console.log("selecteQuestionTimes = ", selectedQuestionTimes);
        // console.log("generatedQuestion = ", generatedQuestions);
    }
    // console.log("LINE 178 RANDOMQGEN: generatedQuestionIDs = ");
    // for (let i = 0; i < uniqueLevels.length; i++) {
    //     const level = uniqueLevels[i];
    //     console.log("LINE 183 level:",level)
    //     console.log("Generated question IDs:",generatedQuestions[level]);
    //     console.log("\n");
    // }
    const returnGeneratedQuestions = [];
    for (let i = 0; i < uniqueLevels.length; i++) {
        const level = uniqueLevels[i];
        for (let j = 0; j < generatedQuestions[level].length; j++) {
            const QID = generatedQuestions[level][j];
            returnGeneratedQuestions.push(QID);
        }
    }    
    // console.log("returnGeneratedQuestions = ", returnGeneratedQuestions);
    return returnGeneratedQuestions;
}


const listOfQuestionIDs = [
    101, 102, 103, 104, 105, 106, 107, 108, 109, 110,
    111, 112, 113, 114, 115, 116, 117, 118, 119, 120,
    121, 122, 123, 124, 125, 126, 127, 128, 129, 130,
    131, 132, 133, 134, 135, 136, 137, 138, 139, 140,
    141, 142, 143, 144, 145, 146, 147, 148, 149, 150,
    151, 152, 153, 154, 155, 156, 157, 158, 159, 160,
    161, 162, 163, 164, 165, 166, 167, 168, 169, 170,
    171, 172, 173, 174, 175, 176, 177, 178, 179, 180,
    181, 182, 183, 184, 185, 186, 187, 188, 189, 190,
    191, 192, 193, 194, 195, 196, 197, 198, 199, 200
];

const listOfLevels = [
    1, 2, 3, 2, 1, 3, 2, 1, 3, 2,
    1, 2, 3, 2, 1, 3, 2, 1, 3, 2,
    1, 2, 3, 2, 1, 3, 2, 1, 3, 2,
    1, 2, 3, 2, 1, 3, 2, 1, 3, 2,
    1, 2, 3, 2, 1, 3, 2, 1, 3, 2,
    1, 2, 3, 2, 1, 3, 2, 1, 3, 2,
    1, 2, 3, 2, 1, 3, 2, 1, 3, 2,
    1, 2, 3, 2, 1, 3, 2, 1, 3, 2,
    1, 2, 3, 2, 1, 3, 2, 1, 3, 2,
    1, 2, 3, 2, 1, 3, 2, 1, 3, 2
];


// generate list of question times
let listOfQuestionTimes = [];

for (let i = 0; i < listOfLevels.length; i++) {
    const level = listOfLevels[i];
    let questionTime;

    // Assign questionTime randomly based on level
    switch (level) {
        case 1:
            const level1Options = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
            questionTime = level1Options[Math.floor(Math.random() * level1Options.length)];
            break;
        case 2:
            const level2Options = [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
            questionTime = level2Options[Math.floor(Math.random() * level2Options.length)];
            break;
        case 3:
            const level3Options = [];
            for (let j = 0; j <= 40; j++) {
                level3Options.push(10.5 + j * 0.5);
            }
            questionTime = level3Options[Math.floor(Math.random() * level3Options.length)];
            break;
        default:
            questionTime = 0; // Handle invalid levels
            break;
    }

    listOfQuestionTimes.push(questionTime);
}

// listOfQuestionTimes = [
//     3, 6, 25.5, 7.5, 4, 19.5, 6, 1.5, 28, 8.5, 0.5, 8,
//     18.5, 8.5, 3, 16, 7.5, 0.5, 26.5, 7, 3, 9.5, 22.5, 10,
//     3.5, 22, 5.5, 2, 24.5, 8.5, 2.5, 6.5, 20, 8, 2.5, 25,
//     10, 3.5, 17.5, 5.5, 4, 6, 15.5, 8, 4.5, 23, 9.5, 3,
//     27, 9, 1.5, 8.5, 13.5, 8.5, 5, 12, 6, 1.5, 12.5, 10,
//     3.5, 8, 25.5, 5.5, 3.5, 30.5, 8.5, 0.5, 29.5, 9, 0.5, 8,
//     25.5, 10, 4, 30.5, 7.5, 0.5, 25, 7.5, 5, 9, 30, 8,
//     5, 16, 10, 5, 20.5, 6.5, 1.5, 8.5, 20, 6.5, 5, 12.5,
//     10, 2, 24, 5.5
// ];
// console.log(listOfQuestionTimes);

// // HYPERPARAMETERS 
// minTotalTime = 90
// maxTotalTime = 120
// distributionOfLevels = [null, 20, 60, 20];

// const generatedQuestionIDs = generateQuestions(listOfQuestionIDs, listOfLevels, listOfQuestionTimes, minTotalTime, maxTotalTime, distributionOfLevels);
module.exports = {
    generateQuestions
};