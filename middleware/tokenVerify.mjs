import jwt from 'jsonwebtoken'

const verifyToken = async (req, res, next) => {
    const token = req.headers.token
    if (token) {
        const accessToken = token
        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err)
                return res.status(403).json({ msg: 'Token is invalid' })
            req.user = user
            next()
        })
    } else {
        res.status(401).json({ msg: 'You are not authenticated' })
    }
}

const verifyTokenAndHost = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'host') {
            next()
        } else {
            res.status(403).json({ message: 'You are not allowed to do that' })
        }
    })
}

export { verifyToken, verifyTokenAndHost }