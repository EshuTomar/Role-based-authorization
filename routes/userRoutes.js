const express = require('express');
const verifyToken = require('../middleware/authMiddleware'); // Middleware to verify JWT token
const router = express.Router();

//only admin can access this route
router.get('/admin', verifyToken, (req, res) => {
  res.json({ message: 'Admin access granted' });
});


//both admin and manager can access this route
router.get('/manager', verifyToken, (req, res) => {
  res.json({ message: 'Admin and manager access granted' });
});


//all  can access this route
router.get('/user', verifyToken, (req, res) => {
  res.json({ message: 'All users access granted' });
});


module.exports = router;
