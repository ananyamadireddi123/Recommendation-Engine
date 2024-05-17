// FUNCTION FOR ADDING A NEW COURSE
function submitForm_add_course(event) {
    event.preventDefault();
    const course_name = document.getElementById('course_name').value;
    data = { course_name }
    console.log("data = ")
    console.log(data)
    // ROUTE : submit_add_course for adding a new course
    fetch('/submit_add_course', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {

            if (data.affectedRows > 0) {
                alert("Course Added Successfully")
            }
            else {
                alert("Course Already Exists")
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
// FUNCTION FOR READING COURSES
function submitForm_read_courses(event) {
    event.preventDefault()

    const data = {};

    // ROUTE : submit_read_courses for reading courses
    fetch('/submit_read_courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.rows.length) {
                // Create a table
                var table = '<table border="1"><tr><th>Course Name</th></tr>';
                // Loop through the data and add rows to the table
                for (var i = 0; i < data.rows.length; i++) {
                    table += '<tr><td>' + data.rows[i].course_name + '</td></tr>';
                }
                // Close the table tag
                table += '</table>';
                // Display the table inside the "read_output" div
                document.getElementById('read_output').innerHTML = table;
            }
            else {
                alert("No Courses Found")
            }
        })
        .catch(error => console.error('Error:', error));
}


// FUNCTION FOR POPULATING THE OLD COURSE NAME IN THE UPDATE COURSE FORM
async function populateOldCourseName_forUpdate() {
    const selectElement = document.getElementById('course_name_upd_old');
    selectElement.innerHTML = '';
    // ROUTE : getCourses for getting all courses
    const response = await fetch('/getCourses');
    const courses = await response.json();
    courses.courses.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.course_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}


// FUNCTION FOR POPULATING THE OLD COURSE NAME IN THE DELETE COURSE FORM
async function populateOldCourseName_forDelete() {
    const selectElement = document.getElementById('course_name_del');
    selectElement.innerHTML = '';
    // ROUTE : getCourses for getting all courses
    const response = await fetch('/getCourses');
    const courses = await response.json();
    courses.courses.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.course_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}


// FUNCTION FOR UPDATING A COURSE
function submitForm_update_course(event) {
    event.preventDefault();
    const course_name_old = document.getElementById('course_name_upd_old').value;
    const course_name_new = document.getElementById('course_name_upd_new').value;
    const data = { course_name_old, course_name_new };
    // ROUTE : submit_update_course for updating a course
    fetch('/submit_update_course', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                alert("Course Updated Successfully");
            } else {
                alert("Course to be Updated Not Found");
            }
        })
        .catch(error => console.error('Error:', error));
}


// FUNCTION FOR DELETING A COURSE
function submitForm_delete_course(event) {
    event.preventDefault();
    const course_name = document.getElementById('course_name_del').value;
    data = { course_name }
    console.log("data = ")
    console.log(data)
    // ROUTE : submit_delete_course for deleting a course
    fetch('/submit_delete_course', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                alert("Course Deleted Successfully")
            } else {
                alert("Course to be Deleted Not Found")
            }
        })
        .catch(error => console.error('Error:', error));
}




















// FUNCTION FOR POPULATING THE COURSE NAME IN THE LINKING FORM
async function populateOldCourseName_forLinking() {
    const selectElement = document.getElementById('course_name_link');

    // ROUTE : getCourses for getting all courses
    const response = await fetch('/getCourses');
    const courses = await response.json();

    courses.courses.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.course_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}