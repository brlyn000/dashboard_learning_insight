
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'Access token required' 
      });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Access token required' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired' 
      });
    }
    
    return res.status(403).json({ 
      success: false,
      message: 'Invalid token' 
    });
  }
};

export const verifyRefreshToken = (req, res, next) => {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Refresh token required' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'your-refresh-secret');
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    console.error('Refresh token error:', error);
    return res.status(403).json({ 
      success: false,
      message: 'Invalid refresh token' 
    });
  }
};