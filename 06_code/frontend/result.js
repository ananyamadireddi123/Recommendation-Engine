const urlParams = new URLSearchParams(window.location.search);
const encodedData = urlParams.get('data');
const decodedData = JSON.parse(decodeURIComponent(encodedData));

// Access the data and responseMapping
const percentage = decodedData.data;
// module to percentages scored
const data = decodedData.responseMapping;
const template_type = decodedData.templateType;
const pass_percentage = decodedData.passPercentage;

// Use the data and responseMapping as needed
console.log("DATA:");
console.log(data);
console.log("Percentage at index 1:");
console.log(percentage[1]);

const Percentage = percentage[0].pass_percentage;

console.log("Checking:", percentage[1].sections);





const resultContainer = document.getElementById('result-container');
resultContainer.innerHTML = ''; // Clear previous content

// determine if it is a Initial Assessment or Practice Test
console.log("LINE 29 RESULT.JS template_type = ", template_type);
// alert(template_type);
if(template_type == 1) {
    // Initial Assessment

    let ctr = 0;
    let module_failed = 0
    
    // Loop through the data and create HTML elements to display it
    for (let i = 1; i < percentage.length; i++) {
        let totalScore = 0.0;
        for (j = 0; j < percentage[i].sections[0].questions.length; j++) {
            for (key in data) {
                if (key == percentage[i].sections[0].questions[j]) {
                    if (Object.hasOwnProperty.call(data, key)) {
                        const value = Number(data[key]);
                        console.log(value);
                        totalScore += value;
                        const div = document.createElement('div');
                        div.innerHTML = `<strong>Question ${key}:</strong> ${value}`;
                        resultContainer.appendChild(div);
                    }
                }
            }
        }
    
        const totalQuestions = percentage[i].sections[0].questions.length;
        console.log(totalQuestions);
        console.log(totalScore);
    
        const averageScore = totalScore / totalQuestions;
        const successPercentage = (totalScore / (totalQuestions)) * 100; // Assuming each question is out of 1
    
        resultContainer.innerHTML += `<p>Your average score is: ${averageScore.toFixed(2)}</p>`;
        resultContainer.innerHTML += `<p>Your success percentage is: ${successPercentage.toFixed(2)}%</p>`;
        if (parseFloat(successPercentage) < parseFloat(Percentage) && ctr == 0) {
            module_failed = i;
            ctr = 1;
        }
    
    
        if (parseFloat(successPercentage) >= parseFloat(Percentage)) {
            resultContainer.innerHTML += `<p>Congratulations! You have passed the assessment.</p>`;
        }
    
        else {
            resultContainer.innerHTML += `<p>Unfortunately, you have not passed the assessment.</p>`;
        
        }
    }
    if(ctr==1)
        {
           
            resultContainer.innerHTML += `<p>Unfortunately, you have not passed the assessment</p>`;
            const secondAssessmentButton = document.createElement('button');
            secondAssessmentButton.textContent = 'Learning material';
            secondAssessmentButton.className = 'assessment-button'; // Add class name
            secondAssessmentButton.onclick = function () {
                window.location.href = 'material.html';
            };
            resultContainer.appendChild(secondAssessmentButton);
            ctr=-1;
        }

    if(ctr!=-1)
    {
        resultContainer.innerHTML += `<p>Congratulations! You have passed the assessment.</p>`;
            const secondAssessmentButton = document.createElement('button');
            secondAssessmentButton.textContent = 'Second Initial Assessment';
            secondAssessmentButton.className = 'assessment-button'; // Add class name
            secondAssessmentButton.onclick = function () {
                window.location.href = '2_test.html';
            };
            resultContainer.appendChild(secondAssessmentButton);
    }
    
    
    // if module_failed=0  update the course number by 1 in the backend sq query.
    
    console.log("LINE 99 RESULT.JS ");
    
    fetch('/passed_online_assessment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ module_failed }),
    })
        .then(response => response.json())
        .then(data => {
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
else {
    // Practice Test
    console.log("LINE 123 RESULT.JS");

    let sum_of_values = 0;
    for(let key in data) {
        const value = data[key];
        console.log("LINE 129 value = ", value);
        const number = Number(value);
        sum_of_values += number;
    }
    let attempt_percentage = sum_of_values / Object.keys(data).length * 100;
    console.log("attempt_percentage = ", attempt_percentage);
    let ctr1=0;

    let passed_learning_test_flag = 1;
    if(attempt_percentage < pass_percentage) {
        passed_learning_test_flag = 0;
        resultContainer.innerHTML += `<p>Unfortunately, you have not passed the assessment.</p>`;
        // Add button for learning material
        ctr1=1;
        
    }
    else {
        resultContainer.innerHTML += `<p>Congratulations! You have passed the assessment.</p>`;
        ctr1=-1;
        
    }

    if(ctr1==1)
    {
        const learningMaterialButton = document.createElement('button');
        learningMaterialButton.textContent = 'Learning Material';
        learningMaterialButton.className = 'learning-button'; // Add class name
        learningMaterialButton.onclick = function () {
            window.location.href = 'material.html'; // Replace with actual URL
        };
        resultContainer.appendChild(learningMaterialButton);
    
    }
    else if(ctr1==-1)
    {
        const secondAssessmentButton = document.createElement('button');
        secondAssessmentButton.textContent = 'Check Progress';
        secondAssessmentButton.className = 'assessment-button'; // Add class name
        secondAssessmentButton.onclick = function () {
            window.location.href = "progress.html";
        };
        resultContainer.appendChild(secondAssessmentButton);

    }
    // send the information about if passed to the backend
    // this updates the user progress table

        fetch('/passed_learning_test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify( passed_learning_test_flag )
        })
            .then(response => response.json())
            .then(data => {
                
            })
            .catch(error => console.error('Error:', error));  
    
}