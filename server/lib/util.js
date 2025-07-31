import jwt from "jsonwebtoken"

const generateToken = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    return token
}

export default generateToken