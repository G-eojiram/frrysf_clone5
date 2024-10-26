import jwt from 'jsonwebtoken';  // Import the default export

// Secret key for signing and verifying the token
const SECRET_KEY = "secretkey123";
const REFRESH_SECRET_KEY = "refreshkey123uwu"

//access token 
function createToken(user) {
    console.log("creating token...");
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        usertype: user.userType
    };

    // Sign the token with the payload and the secret key, set an expiration time
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    // console.log("token", user.userType, token)
    return token;
}
//refresh token 
function createRefreshToken(user) {
    console.log("creating refresh token...")
    const payload = {
        id: user.id,
        usertype: user.userType
    };
    
    // Create a long-lived refresh token (e.g., 7 days)
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '7d' });
    // console.log("refresh token", user.userType, refreshToken)
    return refreshToken;
}

// Verify a access token
function verifyToken(req) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or invalid' });
    }

    // Extract the token (removing the 'Bearer ' part)
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;  // Proceed if valid
    } catch (error) {
        // Handle invalid or expired tokens
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}
//verify refresh token 
function verifyRefreshToken(token) {
    try {
        const decoded = jwt.verify(token, REFRESH_SECRET_KEY);
        return decoded;
    } catch (error) {
        return null;  // Refresh token is expired or invalid
    }
}

export {
    createToken, 
    verifyToken,
    createRefreshToken, 
    verifyRefreshToken
};
