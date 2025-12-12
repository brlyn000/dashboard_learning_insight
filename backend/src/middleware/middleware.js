import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

    const user = await prisma.users.findFirst({
        where: { refresh_token: refreshToken }
    });

    if (!user) return res.status(403).json({ message: "Invalid refresh token" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token expired" });

        const newAccessToken = generateAccessToken(user);

        res.json({
            accessToken: newAccessToken
        });
    });
}
