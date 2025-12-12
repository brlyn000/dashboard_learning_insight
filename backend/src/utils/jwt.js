import jwt from 'jsonwebtoken';

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {id:user.id, email:user.email},
        process.env.JWT_REFRESH,
        {expiresIn: '30d'}
    )
}

export const generateAccessToken = (user) => {
    return jwt.sign(
        {id:user.id, email:user.email},
        process.env.JWT_ACCESS,
        {expiresIn: '1d'}
    )
}