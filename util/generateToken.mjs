import jwt from 'jsonwebtoken'

const generateAccessToken = async (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: '15m' }
    )
}


export { generateAccessToken }