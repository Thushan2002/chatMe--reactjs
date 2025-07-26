import generateToken from "../lib/util.js"
import User from "../models/UserModel.js"
import bcrypt from "bcryptjs"

//  signup user

export const signUp = async (req, res) => {
    const { fullName, bio, password, email } = req.body
    try {

        if (!fullName || !bio || !password || !email) {
            return res.json({ success: false, message: "Missing Fields" })
        }
        const user = await User.findOne(email)
        if (user) {
            return res.json({ success: false, message: "Email already Exists" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User.create({
            fullName,
            bio,
            email,
            password: hashedPassword
        })

        const token = generateToken(newUser._id)

        res.json({ success: true, userData: newUser, token, message: "Account created Succefully" })

    } catch (error) {
        console.log(`Error in Signup Controller ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// user login

export const logIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne(email)
        if (!existingUser) {
            res.json({ success: false, message: "User doesn't exists" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser?.password || "")
        if (!isPasswordCorrect) {
            res.json({ success: false, message: "Password mismatched" })
        }

        const token = generateToken(existingUser?._id, res)
        res.json({ success: true, token, existingUser, message: "Login Success" })
    } catch (error) {
        console.log(`Error in Login Controller ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}