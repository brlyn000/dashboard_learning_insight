import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ msg: 'Access token required' });
    }
    
    jwt.verify(token, process.env.JWT_ACCESS, (err, decoded) => {
        if (err) return res.status(403).json({ msg: 'Invalid token' });
        req.userId = decoded.id;
        req.userEmail = decoded.email;
        next();
    });
};