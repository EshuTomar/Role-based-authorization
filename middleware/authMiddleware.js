//it will make sure that the user is authenticated before accessing protected routes
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token;
    // Check if the token is in the headers
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if(authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]; // Extract the token from the header

        if(!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }

        try{
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Attach the user information to the request object
            console.log('User authenticated:', req.user);
            
            next(); // Proceed to the next middleware or route handler

            
        }catch(error) {
            return res.status(401).json({ message: 'Token is not valid' });
        }

    }

}

module.exports = verifyToken;
