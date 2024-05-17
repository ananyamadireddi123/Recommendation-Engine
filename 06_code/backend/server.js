// MAIN CODE (initialising server and all the routes)

// ALL IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const { link } = require('fs');


// creating new express app on the given port
const app = express();
const port = 3005;


// serving static files from the '../frontend/' directory
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use(express.json());


// parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));





// IMPORT FROM routes 
require("./routes/routes.js")(app);






// MAIN PAGE SERVER
app.post("/")

// Serve index.html when accessing the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});