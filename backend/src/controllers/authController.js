import prisma from '../utils/prisma.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
    { expiresIn: '7d' }
  );
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exist = await prisma.users.findUnique({
      where: { email: email }
    });

    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: hashed,
        user_role: "student",
        created_at: new Date(),
        updated_at: new Date()
      }
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await prisma.users.update({
      where: { id: user.id },
      data: { refresh_token: refreshToken }
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    });

    res.json({
      success: true,
      message: "Registration successful",
      token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.user_role
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: "Server error during registration"
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }


    let isPasswordValid = false;


    if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {

      isPasswordValid = await bcrypt.compare(password, user.password);
    } else {

      isPasswordValid = (password === user.password);
      console.warn('⚠️ WARNING: Plain text password detected for user:', email);
      console.warn('⚠️ This is only acceptable for development/demo!');
    }

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);


    await prisma.users.update({
      where: { id: user.id },
      data: { refresh_token: refreshToken }
    });


    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    });


    res.json({
      success: true,
      message: "Login successful",
      token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.user_role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: "Server error during authentication"
    });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (token) {
      await prisma.users.updateMany({
        where: { refresh_token: token },
        data: { refresh_token: null }
      });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === 'production',
      path: "/"
    });

    res.json({
      success: true,
      message: "Logout successful"
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: "Server error during logout"
    });
  }
};

export const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found"
      });
    }

    const user = await prisma.users.findFirst({
      where: { refresh_token: token }
    });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token"
      });
    }


    jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'your-refresh-secret');


    const accessToken = generateAccessToken(user);

    return res.json({
      success: true,
      token: accessToken
    });

  } catch (err) {
    console.error('Refresh token error:', err);
    return res.status(403).json({
      success: false,
      message: "Invalid or expired refresh token"
    });
  }
};
