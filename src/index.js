const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');

dotenv.config(); // Load environment variables from .env file

const app = express();
connectDB(); // Connect to the database

//middlewares
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


//routes
app.use('/api/auth', authRoutes); // Use authentication routes
app.use('/api/users', userRoutes); // Use user routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


//start server 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




module.exports = app; // Export the app for testing or further configuration