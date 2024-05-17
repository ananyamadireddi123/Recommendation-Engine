// FUNCTION FOR ADDING A MODULE
function submitForm_add_module(event) {
    event.preventDefault();
    const Module_name = document.getElementById('module_name').value;
    data = { Module_name }

    console.log("data = ")
    console.log(data)

    // ROUTE : submit_add_module for adding a module
    fetch('/submit_add_module', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {

            if (data.affectedRows > 0) {
                alert("Module Added Successfully")
            }
            else {
                alert("Module Already Exists")
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });
}


// FUNCTION FOR READING ALL MODULES
function submitForm_read_modules(event) {
    event.preventDefault();

    // intialising data variable
    const data = {};

    // ROUTE : submit_read_modules for reading all modules
    fetch('/submit_read_modules', {
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
                var table = '<table border="1"><tr><th>Module Name</th></tr>';

                // Loop through the data and add rows to the table
                for (var i = 0; i < data.rows.length; i++) {
                    table += '<tr><td>' + data.rows[i].module_name + '</td></tr>';
                }

                // Close the table tag
                table += '</table>';

                // Display the table inside the "read_output" div
                document.getElementById('read_output').innerHTML = table;
            }
            else {
                alert("No Modules Found")
            }
        })
        .catch(error => console.error('Error:', error));
}


// FUNCTION FOR POPULATING MODULES FOR UPDATING
async function populateOldModuleName_forUpdate() {
    const selectElement = document.getElementById('module_name_upd_old');
    selectElement.innerHTML = '';

    const response = await fetch('/getModules');
    const modules = await response.json();
    console.log(modules);

    modules.modules.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.module_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}


// FUNCTION FOR UPDATING A MODULE
function submitForm_update_module(event) {
    event.preventDefault();
    const Module_name_old = document.getElementById('module_name_upd_old').value;
    const Module_name_new = document.getElementById('module_name_upd_new').value;

    data = { Module_name_old, Module_name_new }

    console.log("data = ")
    console.log(data)

    // ROUTE : submit_update_module for updating a module
    fetch('/submit_update_module', {
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
                alert("Module Updated Successfully")
            } else {
                alert("Module to be Updated Not Found")
            }
        })
        .catch(error => console.error('Error:', error));
}


// FUNCTION FOR POPULATING MODULES FOR DELETING
async function populateOldModuleName_forDelete() {
    const selectElement = document.getElementById('module_name_del');
    selectElement.innerHTML = '';

    const response = await fetch('/getModules');
    const modules = await response.json();
    console.log(modules);

    modules.modules.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.module_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}


// FUNCTION FOR DELETING A MODULE
function submitForm_delete_module(event) {
    event.preventDefault();
    const Module_name = document.getElementById('module_name_del').value;
    data = { Module_name }

    console.log("data = ")
    console.log(data)

    // ROUTE : submit_delete_module for deleting a module
    fetch('/submit_delete_module', {
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
                alert("Module Deleted Successfully")
            } else {
                alert("Module to be Deleted Not Found")
            }
        })
        .catch(error => console.error('Error:', error));
}























// FUNCTION FOR POPULATING MODULES FOR LINKING COURSES
async function populateOldModuleName_forLinkingCourses() {
    const selectElement = document.getElementById('module_name_cou_link');
    selectElement.innerHTML = '';

    // ROUTE : getModules for getting all modules
    const response = await fetch('/getModules');
    const modules = await response.json();
    console.log(modules);

    modules.modules.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.module_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}


// FUNCTION FOR POPULATING MODULES FOR LINKING SUBSKILLS
async function populateOldModuleName_forLinkingSubskills() {
    const selectElement = document.getElementById('module_name_ss_link');
    selectElement.innerHTML = '';

    // ROUTE : getModules for getting all modules
    const response = await fetch('/getModules');
    const modules = await response.json();
    console.log(modules);

    modules.modules.forEach((course) => {
        const option = document.createElement('option');
        option.textContent = course.module_name; // Assuming course.name is the course name
        selectElement.appendChild(option);
    });
}