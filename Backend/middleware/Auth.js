import jwt from "jsonwebtoken";

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'Unauthorized, JWT token required.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       console.log("JWT PAYLOAD (auth):", decoded); 
        req.user = decoded;
        
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized, JWT token invalid or expired.' });
    }
};

const ensureAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
   
    next();
};

export { ensureAuthenticated, ensureAdmin };