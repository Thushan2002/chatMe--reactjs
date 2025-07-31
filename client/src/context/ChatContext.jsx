import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket, axios } = useContext(AuthContext);

  //   function to get all users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/message/get-users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //   fetch messages for selected chat
  const getMessages = async () => {
    try {
      const { data } = await axios.get(`/api/message/${selectedUser._id}`);
      console.log("dat", data);

      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //   send messages to selected user

  const sendMessages = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/message/send/${selectedUser._id}`,
        messageData
      );
      console.log(
        "Sending message to:",
        `/api/message/send/${selectedUser._id}`,
        messageData
      );

      if (data.success) {
        setMessages((prevMessages) => [...prevMessages, data.newMessage]);
        console.log("msg:suc:", data);
      } else {
        toast.error(data.message);
        console.log("msg:fail:", data);
      }
    } catch (error) {
      console.log("🔥 Axios Error:", error);
      console.log("selectedUser._id:", selectedUser?._id);
      toast.error(error.message);
      console.log("poda");
    }
  };

  //   subscribe to new messages

  const subscribeToMessages = async () => {
    if (!socket) return;
    socket.on("newMessage", (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        axios.put(`/api/message/mark/${newMessage._id}`);
      } else {
        setUnseenMessages((prevUnseenMessages) => ({
          ...prevUnseenMessages,
          [newMessage.senderId]: prevUnseenMessages[newMessage.senderId]
            ? prevUnseenMessages[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  };

  //   function to unsubsercibe from messages
  const unsubsercibeFromMessages = () => {
    if (socket) socket.off("newMessage");
  };

  useEffect(() => {
    subscribeToMessages();
    return () => unsubsercibeFromMessages();
  }, [socket, selectedUser]);

  const value = {
    messages,
    users,
    selectedUser,
    getAllUsers,
    getMessages,
    sendMessages,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
