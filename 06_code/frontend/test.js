// FUNCTION TO GET ONLINE ASSESSMENT
function getOnlineAssessment(event) {
    event.preventDefault();
    parentName = document.getElementById("course_name_test").value;
    parentType = "COURSES"
    data = { parentName, parentType };

    fetch('/online_assessment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('script.js l994 data = ')
            console.log(data);

        })
        .catch(error => console.error('Error:', error));
}














// FUNCTION TO GET AN EXAM TEMPLATE
function getExamTemplate(event) {
    event.preventDefault();
    template_id = document.getElementById("exam_template_id").value;
    console.log(template_id);
    data = { template_id };
    fetch('/exam_template', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            Tests = data.Questions;            
            const examContainer = document.getElementById('exam_container');
    examContainer.innerHTML = '';

    // initial assessment
    if (template_id == 1 || template_id == 7) {
        for (let i = 1; i < Tests.length; i++) {
            const module = Tests[i];
            const moduleElement = document.createElement('div');
            moduleElement.innerHTML = `<h3>Module ${module.module_number}</h3>`;
            examContainer.appendChild(moduleElement);
      
            for (let j = 0; j < module.sections.length; j++) {
              const section = module.sections[j];
              const sectionElement = document.createElement('div');
              sectionElement.innerHTML = `<h4>${section.section_number}</h4>`;
              examContainer.appendChild(sectionElement);
              // console.log("HI", section.questions);
              if(section)
              for (let k = 0; k < section.questions.length; k++) {
                const question = section.questions[k];
                const questionElement = document.createElement('div');
                console.log("HI", question);
                questionElement.innerHTML = `
                  <p>Question ${question}  </p>
                  <input type="number" min="0" max="1" data-question-id="${question}" />
                `;
                examContainer.appendChild(questionElement);
              }
            }
          }
    }
    // practice test
    else if (template_id ==2 || template_id == 3 || template_id == 4 || template_id == 5 || template_id == 6) {
        for (let i = 1; i < Tests.length; i++) {
            const module = Tests[i];
            const moduleElement = document.createElement('div');
            moduleElement.innerHTML = `<h3>SubSkill ${module.subskill_number}</h3>`;
            examContainer.appendChild(moduleElement);
            console.log(module.sections);
            
            for (let j = 0; j < module.sections.length; j++) {
              const section = module.sections[j];
              const sectionElement = document.createElement('div');
              sectionElement.innerHTML = `<h4>${section.section_number}</h4>`;
              examContainer.appendChild(sectionElement);
  
                for (let k = 0; k < section.questions.length; k++) {
                    const question = section.questions[k];
                    const questionElement = document.createElement('div');
                    questionElement.innerHTML = `
                    <p>Question ${question}  </p>
                    <input type="number" min="0" max="1" data-question-id="${question}" />
                    `;
                    examContainer.appendChild(questionElement);
                }
            }
        }
    }
    // Iterate through the modules and sections to display the questions
    
    const submitButton = document.createElement('button');
            submitButton.textContent = 'Submit';
            submitButton.onclick = handleSubmit;
            examContainer.appendChild(submitButton);
        })
        .catch(error => console.error('Error:', error));
}

function handleSubmit() {
    // Create a structure to hold responses
    const responseMapping = {};

    // Find all input elements with data-question-id attribute
    const inputElements = document.querySelectorAll('input[data-question-id]');

    // Iterate through input elements to gather responses
    inputElements.forEach(inputElement => {
        const questionId = inputElement.dataset.questionId;
        const response = inputElement.value;
        responseMapping[questionId] = response;
    });

    // Now you have a mapping of question IDs to responses
    console.log('Response Mapping:', responseMapping);

    // Example: Send response mapping to the server
    fetch('/submit_response_mapping', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(responseMapping)
        
    })
        .then(response => response.json())
        .then(data => {
            
            console.log('Server response LINE 117:', data);
            console.log(data.data[0].type)
            let template_type;
            if(data.data[0].type == "Initial Assesment") {
                template_type = 1;
            }
            else {
                template_type = 2;
            }
            //data is Test.json
            //window.location.href = `result.html?data=${JSON.stringify(responseMapping)}`;
            // template_type is 1 for IA
            // template_type is 2 for PT

            const pass_percentage = data.data[0].pass_percentage;
            const resultData = {
                data: data.data,
                responseMapping: responseMapping,
                templateType: template_type,
                passPercentage: pass_percentage
            };
            // Encode the resultData as a URI component
            const encodedData = encodeURIComponent(JSON.stringify(resultData));
            // Redirect to result.html with the encoded data in the query parameter
            window.location.href = `result.html?data=${encodedData}`;
        })
        .catch(error => {
            console.log("LINE 130 TEST.JS")
            console.error('Error:', error)
            
        });
    console.log("line 128");
}
