const generateAccessToken = async (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: '15m' }
    )
}

const generateRefreshToken = async (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: '30d' }
    )
}

export { generateAccessToken, generateRefreshToken }