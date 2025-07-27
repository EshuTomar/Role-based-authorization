const express = require('express');

const router = express.Router();

//only admin can access this route
router.get('/admin', (req, res) => {
  res.json({ message: 'Admin access granted' });
});


//both admin and manager can access this route
router.get('/manager', (req, res) => {
  res.json({ message: 'Admin and manager access granted' });
});


//all  can access this route
router.get('/user', (req, res) => {
  res.json({ message: 'All users access granted' });
});


module.exports = router;
