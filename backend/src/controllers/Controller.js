import prisma from "../utils/prisma.js";

// Using singleton prisma from utils

export const getUsers = async (req, res) => {
    try {
        const response = await prisma.users.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};  

export const getUsersById = async (req, res) => {
    try {
        const response = await prisma.users.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};
