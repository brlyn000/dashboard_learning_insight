import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

const prisma = new PrismaClient();

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const exist = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });
        if (exist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const hased = await bcrypt.hash(password, 10);
        const user = await prisma.users.create({
            data: {
                display_name: name,
                name: name, 
                email: email,
                password: hased,
            },
        });

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        await prisma.users.update({
            where: {
                id: user.id,
            },
            data: {
                refresh_token: refreshToken,
            },
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'lax',
            secure: false
        })
        return res.json({
            message: "Register Berhasil",
            accessToken,
            refreshToken,
        })
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({ where: { email }});
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Password salah" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await prisma.users.update({
        where: { id: user.id },
        data: { refresh_token: refreshToken }
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'lax',
        secure: false
    });

    res.json({
        message: "Login Berhasil",
        accessToken,
        refreshToken
    });
};

export const logout = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(204).end();

  // Bersihkan DB
  await prisma.users.updateMany({
    where: { refresh_token: token },
    data: { refresh_token: null }
  });

  // Hapus cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    path: "/"
  });

  res.json({ msg: "Logout berhasil!" });
};

export const refresh = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ msg: "Refresh token tidak ditemukan" });

  const user = await prisma.users.findFirst({
    where: { refresh_token: token }
  });

  if (!user) return res.status(403).json({ msg: "Refresh token tidak valid" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH);
    const accessToken = generateAccessToken(user);
    return res.json({ accessToken });
  } catch (err) {
    return res.status(403).json({ msg: "Refresh token invalid" });
  }
};
