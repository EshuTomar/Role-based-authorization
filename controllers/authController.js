const User = require('../models/userModel'); // Import the User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // For password hashing




const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newUser = new User({
      username,
      password: hashedPassword,
      role: role || 'user', // Default to 'user' if no role is provided
    });

    await newUser.save(); // Save the user to the database
   
    res.status(201).json({ message: 'User registered successfully', user: newUser });

  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
}

const loginUser = async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            //payload, secret-key, options
            { id: user._id,role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' }
        );  
        
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });
     
        
    }catch (error) {
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
}

module.exports = {
  registerUser,
    loginUser
}