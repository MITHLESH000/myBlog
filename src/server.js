const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require('./config/database');
const indexRoutes = require('./routes/index');
// const fileRoutes = require('./routes/fileRoutes'); // Separate file routes
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files middleware
app.use(express.static(path.join(__dirname, '../public')));

// Middleware to parse cookies
app.use(cookieParser());

// Define root routes
app.use('/', indexRoutes);

// Use the file routes
// app.use('/api/files', indexRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'home.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
