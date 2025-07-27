const express = require('express');
const dotenv = require('dotenv');


dotenv.config(); // Load environment variables from .env file

const app = express();


//middlewares
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


//routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


//start server 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




module.exports = app; // Export the app for testing or further configuration