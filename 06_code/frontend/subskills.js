// FUNCTION FOR ADDING A SUBSKILL
function submitForm_add_subskill(event) {
    event.preventDefault();

    const skill_name = document.getElementById('subskill_name').value;
    data = { skill_name }

    console.log("data = ")
    console.log(data)

    // ROUTE : submit_add_subskill for adding a subskill
    fetch('/submit_add_subskill', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {

            if (data.affectedRows > 0) {
                alert("skill Added Successfully")
            }
            else {
                alert("skill Already Exists")
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });
}


// FUNCTION FOR READING SUBSKILLS
function submitForm_read_subskills(event) {
    event.preventDefault()

    const data = {};

    // ROUTE : submit_read_subskills for reading subskills
    fetch('/submit_read_subskills', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.rows.length) {
                // Create a table
                var table = '<table border="1"><tr><th>skill Name</th></tr>';

                // Loop through the data and add rows to the table
                for (var i = 0; i < data.rows.length; i++) {
                    table += '<tr><td>' + data.rows[i].subskill_name + '</td></tr>';
                }

                // Close the table tag
                table += '</table>';

                // Display the table inside the "read_output" div
                document.getElementById('read_output').innerHTML = table;
            }
            else {
                alert("No skills Found")
            }
        })
        .catch(error => console.error('Error:', error));
}


// FUNCTION FOR POPULATING SUBSKILL NAME FOR UPDATING
async function populateOldSubskillName_forUpdate() {
    const selectElement = document.getElementById('subskill_name_upd_old');
    selectElement.innerHTML = '';

    const response = await fetch('/getSubskills');
    const subskills = await response.json();

    subskills.subskills.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.subskill_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}


// FUNCTION FOR UPDATING A SUBSKILL
function submitForm_update_subskill(event) {
    event.preventDefault();
    const skill_name_old = document.getElementById('subskill_name_upd_old').value;
    const skill_name_new = document.getElementById('subskill_name_upd_new').value;

    data = { skill_name_old, skill_name_new }

    console.log("data = ")
    console.log(data)

    // ROUTE : submit_update_subskill for updating a subskill
    fetch('/submit_update_subskill', {
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
                alert("subskill Updated Successfully")
            } else {
                alert("subskill to be Updated Not Found")
            }
        })
        .catch(error => console.error('Error:', error));
}


// FUNCTION FOR POPULATING SUBSKILL NAME FOR DELETING
async function populateOldSubskillName_forDelete() {
    const selectElement = document.getElementById('subskill_name_del');
    selectElement.innerHTML = '';

    const response = await fetch('/getSubskills');
    const subskills = await response.json();

    subskills.subskills.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.subskill_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}


// FUNCTION FOR DELETING A SUBSKILL
function submitForm_delete_subskill(event) {
    event.preventDefault();
    const skill_name = document.getElementById('subskill_name_del').value;
    data = { skill_name }

    console.log("data = ")
    console.log(data)

    fetch('/submit_delete_subskill', {
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
                alert("skill Deleted Successfully")
            } else {
                alert("skill to be Deleted Not Found")
            }
        })
        .catch(error => console.error('Error:', error));
}






















// FUNCTION FOR POPULATING SUBSKILLS FOR LINKING TO MODULES
async function populateOldSubskillName_forLinkingModules() {
    const selectElement = document.getElementById('ss_name_module_link');
    selectElement.innerHTML = '';

    const response = await fetch('/getSubskills');
    const subskills = await response.json();

    subskills.subskills.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.subskill_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}


// FUNCTION FOR POPULATING SUBSKILLS FOR LINKING TO SKILLTOPICS
async function populateOldSubskillName_forLinkingSkilltopics() {
    const selectElement = document.getElementById('subskill_name_st_link');
    selectElement.innerHTML = '';

    const response = await fetch('/getSubskills');
    const subskills = await response.json();

    subskills.subskills.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.subskill_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}