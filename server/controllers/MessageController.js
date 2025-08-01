import cloudinary from "../lib/cloudinary.js"
import Message from "../models/MessageModel.js"
import User from "../models/UserModel.js"
import { io, userSocketMap } from "../server.js"


// send message

export const getUserForSidebar = async (req, res) => {
    try {
        const userId = req.user._id
        // fetch other users
        const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password")

        // count numbers of msg not seen 
        const unseenMessages = {}
        const promises = filteredUsers.map(async (user) => {
            const messages = await Message.find({ senderId: user._id, receiverId: userId, seen: false });
            if (messages.length > 0) {
                unseenMessages[user._id] = messages.length
            }
        })

        await Promise.all(promises)
        res.json({ success: true, users: filteredUsers, unseenMessages })
    } catch (error) {
        console.log(`Error in getUserForSidebar Controller ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// fetch all the message for the selected users

export const fetchAllMessagesOfSelectedUser = async (req, res) => {
    try {
        const selectedId = req.params.id
        const userId = req.user._id

        const messages = await Message.find({
            $or: [
                { receiverId: userId, senderId: selectedId },
                { receiverId: selectedId, senderId: userId },
            ]
        })
        // update seen
        await Message.updateMany({ receiverId: userId, senderId: selectedId }, { seen: true })
        res.json({ success: true, messages })
    } catch (error) {
        console.log(`Error in fetchAllMessagesOfSelectedUser Controller ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// mark messsage as seen

export const markMessageAsSeen = async (req, res) => {
    try {
        const { id } = req.params
        await Message.findByIdAndUpdate(id, { seen: true })
        res.json({ success: true })
    } catch (error) {
        console.log(`Error in markMessageAsSeen Controller ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// send messages for selected user

export const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body
        const receiverId = req.params.id
        const senderId = req.user._id


        let imageUrl;
        if (image) {
            const uploadResult = await cloudinary.uploader.upload(image);
            imageUrl = uploadResult.secure_url;
        }

        const newMessage = await Message.create({
            senderId: senderId,
            receiverId: receiverId,
            image: imageUrl,
            text
        })

        // emit the new message to the receiver's socket
        const receiverSocketId = userSocketMap[receiverId]
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        return res.json({ success: true, newMessage })

    } catch (error) {
        console.log(`Error in sendMessages Controller ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}
