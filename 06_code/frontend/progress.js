function showUserProgress(event) {
    event.preventDefault();

    fetch('/show_user_progress', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(null)
    })
        .then(response => response.json())
        .then(data => {
            ids = data.Progress;
            // inject the data

           


            var inject = '<ul>';

            // Add list items to the unordered list
            inject += '<li>Course ID: ' + ids.course_id + '</li>';
            inject += '<li>Module ID: ' + ids.module_id + '</li>';
            inject += '<li>Subskill ID: ' + ids.subskill_id + '</li>';
            inject += '<li>Level: ' + ids.level + '</li>';
            inject += '<li>State: ' + ids.state + '</li>';

            // Close the unordered list tag
            inject += '</ul>';
            
            console.log(inject);

            document.getElementById("user_progress_output").innerHTML = inject;

        })
        .catch(error => console.error('Error:', error));
}













// NOT RELEVANT FOR NOW
function submitOnlineAssessment(event) {
    event.preventDefault();
    numberOfQuestions = document.getElementById("total_number_of_questions").value;
    arrayOfResponses = [];
    for (let index = 0; index < numberOfQuestions; index++) {
        user_option = document.getElementById("answer" + index).value;
        correct_option = document.getElementById("correct_option" + index).value;
        question_id = document.getElementById("question_id" + index).value;

        user_option = user_option.toUpperCase();

        arrayOfResponses.push({ question_id, user_option, correct_option });
    }
    console.log(arrayOfResponses);

    fetch('/submit_online_assessment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(arrayOfResponses)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error('Error:', error));
}