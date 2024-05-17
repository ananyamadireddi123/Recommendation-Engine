// FUNCTION FOR ADDING A SKILLTOPIC
function submitForm_add_skilltopic(event) {
    event.preventDefault();
    const skilltopic_name = document.getElementById('skilltopic_name').value;
    data = { skilltopic_name }

    console.log("data = ")
    console.log(data)

    // ROUTE : submit_add_skilltopic for adding a skilltopic
    fetch('/submit_add_skilltopic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {

            if (data.affectedRows > 0) {
                alert("skilltopic Added Successfully")
            }
            else {
                alert("skilltopic Already Exists")
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });
}


// FUNCTION FOR READING ALL SKILLTOPICS
function submitForm_read_skilltopics(event) {
    event.preventDefault()

    const data = {};

    // ROUTE : submit_read_skilltopics for reading all skilltopics
    fetch('/submit_read_skilltopics', {
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
                var table = '<table border="1"><tr><th>skilltopic Name</th></tr>';

                // Loop through the data and add rows to the table
                for (var i = 0; i < data.rows.length; i++) {
                    table += '<tr><td>' + data.rows[i].skilltopic_name + '</td></tr>';
                }

                // Close the table tag
                table += '</table>';

                // Display the table inside the "read_output" div
                document.getElementById('read_output').innerHTML = table;
            }
            else {
                alert("No skilltopics Found")
            }
        })
        .catch(error => console.error('Error:', error));
}


// FUNCTION FOR POPULATING SKILLTOPIC NAMES FOR UPDATING
async function populateOldSkilltopicName_forUpdate() {
    const selectElement = document.getElementById('skilltopic_name_upd_old');
    selectElement.innerHTML = '';

    // ROUTE : getSkilltopics for getting all skilltopics
    const response = await fetch('/getSkilltopics');
    const skilltopics = await response.json();
    console.log(skilltopics);

    skilltopics.skilltopics.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.skilltopic_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}


// FUNCTION FOR UPDATING A SKILLTOPIC
function submitForm_update_skilltopic(event) {
    event.preventDefault();
    const skilltopic_name_old = document.getElementById('skilltopic_name_upd_old').value;
    const skilltopic_name_new = document.getElementById('skilltopic_name_upd_new').value;

    data = { skilltopic_name_old, skilltopic_name_new }

    console.log("data = ")
    console.log(data)

    // ROUTE : submit_update_skilltopic for updating a skilltopic
    fetch('/submit_update_skilltopic', {
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
                alert("skilltopic Updated Successfully")
            } else {
                alert("skilltopic to be Updated Not Found")
            }
        })
        .catch(error => console.error('Error:', error));
}


// FUNCTION FOR POPULATING SKILLTOPIC NAMES FOR DELETING
async function populateOldSkilltopicName_forDelete() {
    const selectElement = document.getElementById('skilltopic_name_del');
    selectElement.innerHTML = '';

    // ROUTE : getSkilltopics for getting all skilltopics
    const response = await fetch('/getSkilltopics');
    const skilltopics = await response.json();
    console.log(skilltopics);

    skilltopics.skilltopics.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.skilltopic_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}


// FUNCTION FOR DELETING A SKILLTOPIC
function submitForm_delete_skilltopic(event) {
    event.preventDefault();
    const skilltopic_name = document.getElementById('skilltopic_name_del').value;
    data = { skilltopic_name }

    console.log("data = ")
    console.log(data)

    // ROUTE : submit_delete_skilltopic for deleting a skilltopic
    fetch('/submit_delete_skilltopic', {
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
                alert("skilltopic Deleted Successfully")
            } else {
                alert("skilltopic to be Deleted Not Found")
            }
        })
        .catch(error => console.error('Error:', error));
}




















// FUNCTION FOR POPULATING SKILLTOPIC NAMES FOR LINKING
async function populateOldSkilltopicName_forLinking() {
    const selectElement = document.getElementById('st_name_subskill_link');
    selectElement.innerHTML = '';

    const response = await fetch('/getSkilltopics');
    const skilltopics = await response.json();
    console.log(skilltopics);

    skilltopics.skilltopics.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.skilltopic_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}