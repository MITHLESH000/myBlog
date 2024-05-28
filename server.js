const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require('./config/database');
const routes = require('./routes/index');



// const blogPageRoute= require('./routes/blogPageRoute');

dotenv.config();
connectDB();


const app = express();
const port = process.env.PORT || 3000;

// set path
// const filePath=path;
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Set up other middleware and routes...
// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
// Routes middleware
app.use('/', routes);
// app.use('/blogPage',blogPageRoute);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
