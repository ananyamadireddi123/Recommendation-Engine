async function populateOldCourseName2() {
    const selectElement = document.getElementById('course_name_link');

    const response = await fetch('/getCourses');
    const courses = await response.json();

    courses.courses.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.course_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}













async function viewModulesInCourse(event) {
    event.preventDefault();
    const course_name = document.getElementById("course_name_link").value;
    console.log("line 755 lo unnanu")
    console.log(course_name)

    fetch('/submit_view_modules_in_course', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ course_name })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.rows == null) {
                document.getElementById("table_of_modules_in_course").innerHTML = "No Modules Found!";
                return;
            }
            if (data.rows.length) {
                data.rows.sort((a, b) => a.module_number - b.module_number);
                // Create a table
                var table = '<table border="1"><tr><th>Module Number</th><th>Module Name</th></tr>';

                // Loop through the data and add rows to the table
                for (var i = 0; i < data.rows.length; i++) {
                    table += '<tr><td>' + data.rows[i].module_number + '<td>' + data.rows[i].module_name + '</td>' + '</td></tr>';
                }

                // Close the table tag
                table += '</table>';

                // Display the table inside the "read_output" div
                document.getElementById("table_of_modules_in_course").innerHTML = table;
            }
            else {
                alert("No Courses Found")
            }

        })
        .catch(error => console.error('Error:', error));
}












async function populateOldModuleName2() {
    const selectElement = document.getElementById('module_name_cou_link');

    const response = await fetch('/getModules');
    const modules = await response.json();
    console.log(modules);

    modules.modules.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.module_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}









function submitForm_ACML(event) {
    event.preventDefault();
    const Course_name = document.getElementById('course_name_link').value;
    const Module_name = document.getElementById('module_name_cou_link').value;
    const moduleNumber = document.getElementById("module_number_for_course_module_link").value;
    data = { Module_name, Course_name, moduleNumber }

    console.log("data = ")
    console.log(data)

    fetch('/submit_add_CourseModule_link', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Handle the response as needed
            if (data.success) {
                alert("Module added to Course Successfully")
            } else {
                alert("Module could not be added to Course")
            }
        })
        .catch(error => console.error('Error:', error));
}








function submitForm_ACML_remove(event) {
    event.preventDefault();
    const course_name = document.getElementById('course_name_link').value;
    const module_name = document.getElementById('module_name_cou_link').value;

    data = { module_name, course_name };

    fetch('/submit_remove_CourseModule_link', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Handle the response as needed
            if (data.success) {
                alert("Module removed from Course Successfully")
            } else {
                alert("Module could not be removed from Course")
            }
        })
        .catch(error => console.error('Error:', error));
}

/*


































*/

async function populateOldModuleName3() {
    const selectElement = document.getElementById('module_name_ss_link');

    const response = await fetch('/getModules');
    const modules = await response.json();
    console.log(modules);

    modules.modules.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.module_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}







async function viewSubskillsInModule(event) {
    event.preventDefault();
    const module_name = document.getElementById("module_name_ss_link").value;
    console.log("line 827 lo unnanu")
    console.log(module_name)

    fetch('/submit_view_subskills_in_module', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ module_name })
    })
        .then(response => response.json())
        .then(data => {
            console.log("line 840")
            console.log(data);
            if (data.rows == null) {
                document.getElementById("table_of_subskills_in_module").innerHTML = "No Subskills Found!";
                return;
            }
            // console.log(data.rows.length);
            if (data.rows.length) {
                data.rows.sort((a, b) => a.subskill_number - b.subskill_number);
                // Create a table
                var table = '<table border="1"><tr><th>subskill Number</th><th>subskill Name</th></tr>';

                // Loop through the data and add rows to the table
                for (var i = 0; i < data.rows.length; i++) {
                    table += '<tr><td>' + data.rows[i].subskill_number + '<td>' + data.rows[i].subskill_name + '</td>' + '</td></tr>';
                }

                // Close the table tag
                table += '</table>';

                // Display the table inside the "read_output" div
                document.getElementById("table_of_subskills_in_module").innerHTML = table;
            }
            else {
                alert("No Subskills Found")
            }

        })
        .catch(error => console.error('Error:', error));
}








async function populateOldSubskillName2() {
    const selectElement = document.getElementById('ss_name_module_link');

    const response = await fetch('/getSubskills');
    const subskills = await response.json();

    subskills.subskills.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.subskill_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}







function submitForm_AMSL(event) {
    event.preventDefault();
    console.log("HI");
    const Module_name = document.getElementById('module_name_ss_link').value;
    const Subskill_name = document.getElementById('ss_name_module_link').value;
    const subskillNumber = document.getElementById('subskill_number_for_module_subskill_link').value;
    data = { Module_name, Subskill_name, subskillNumber }

    console.log("data = ")
    console.log(data)

    fetch('/submit_add_ModuleSubskill_link', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Handle the response as needed
            if (data.success) {
                alert("Subskill added to Module Successfully")
            } else {
                alert("Subskill could not be added to Module")
            }
        })
        .catch(error => console.error('Error:', error));
}








function submitForm_AMSL_remove(event) {
    event.preventDefault();
    console.log("HI");
    const Module_name = document.getElementById('module_name_ss_link').value;
    const Subskill_name = document.getElementById('ss_name_module_link').value;
    data = { Module_name, Subskill_name }

    console.log("eintramawa em chestunnava?")
    fetch('/submit_remove_ModuleSubskill_link', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Handle the response as needed
            if (data.success) {
                alert("Subskill removed from Module Successfully")
            } else {
                alert("Subskill could not be removed from Module")
            }
        })
        .catch(error => console.error('Error:', error));
}



/*



































*/


async function populateOldSubskillName3() {
    const selectElement = document.getElementById('subskill_name_st_link');

    const response = await fetch('/getSubskills');
    const subskills = await response.json();

    subskills.subskills.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.subskill_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}







async function viewSkilltopicsInSubskill(event) {
    event.preventDefault();
    const subskill_name = document.getElementById("subskill_name_st_link").value;
    console.log("line 906 lo unnanu")
    console.log(subskill_name)

    fetch('/submit_view_skilltopics_in_subskill', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ subskill_name })
    })
        .then(response => response.json())
        .then(data => {
            console.log("line 918")
            console.log(data);
            if (data.rows == null) {
                document.getElementById("table_of_skilltopics_in_subskills").innerHTML = "No Skilltopics Found!";
                return;
            }
            // console.log(data.rows.length);
            if (data.rows.length) {
                data.rows.sort((a, b) => a.skilltopic_number - b.skilltopic_number);
                // Create a table
                var table = '<table border="1"><tr><th>skilltopic Number</th><th>skilltopic Name</th></tr>';

                // Loop through the data and add rows to the table
                for (var i = 0; i < data.rows.length; i++) {
                    table += '<tr><td>' + data.rows[i].skilltopic_number + '<td>' + data.rows[i].skilltopic_name + '</td>' + '</td></tr>';
                }

                // Close the table tag
                table += '</table>';

                // Display the table inside the "read_output" div
                document.getElementById("table_of_skilltopics_in_subskills").innerHTML = table;
            }
            else {
                alert("No Skilltopoics Found")
            }

        })
        .catch(error => console.error('Error:', error));
}









async function populateOldSkilltopicName2() {
    const selectElement = document.getElementById('st_name_subskill_link');

    const response = await fetch('/getSkilltopics');
    const skilltopics = await response.json();
    console.log(skilltopics);

    skilltopics.skilltopics.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.skilltopic_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}






function submitForm_ASSTL(event) {
    event.preventDefault();
    console.log("HI");
    const Skill_Topic = document.getElementById('st_name_subskill_link').value;
    const Subskill_name = document.getElementById('subskill_name_st_link').value;
    const skilltopic_number = document.getElementById("skilltopic_number_for_subskill_skilltopic_link").value;

    data = { Skill_Topic, Subskill_name, skilltopic_number }

    console.log("data = ")
    console.log(data)

    fetch('/submit_add_SubskillSkilltopic_link', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Handle the response as needed
            if (data.success) {
                alert("Skilltopic added to Subskill Successfully")
            } else {
                alert("Skilltopic could not be added to Subskill")
            }
        })
        .catch(error => console.error('Error:', error));
}







function submitForm_ASSTL_remove(event) {
    event.preventDefault();
    const subskill_name = document.getElementById('subskill_name_st_link').value;
    const skilltopic_name = document.getElementById('st_name_subskill_link').value;

    data = { subskill_name, skilltopic_name };

    fetch('/submit_remove_SubskillSkilltopic_link', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Handle the response as needed
            if (data.success) {
                alert("Skilltopic removed from Subskill Successfully")
            } else {
                alert("Skilltopic could not be removed from Subskill")
            }
        })
        .catch(error => console.error('Error:', error));
}


/*



































*/


