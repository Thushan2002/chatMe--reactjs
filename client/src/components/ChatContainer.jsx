import React, { useContext, useEffect, useRef, useState } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/util";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessages, getMessages } =
    useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  const scrollEnd = useRef();

  const [input, setInput] = useState("");

  // handle send messages
  const handleSendMessages = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessages({ text: input.trim() });
    setInput("");
  };

  // handle image send

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("select an Image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessages({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <img
            src={selectedUser.profilePic || assets.avatar_icon}
            alt=""
            className="w-8 rounded-full"
          />
          <p className="text-sm font-medium">{selectedUser.fullName}</p>
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <img
            onClick={() => setSelectedUser(null)}
            src={assets.arrow_icon}
            alt=""
            className="md:hidden w-5 cursor-pointer"
          />
          <img src={assets.help_icon} alt="" className="hidden md:block w-5" />
        </div>
      </div>

      {/* Scrollable Message Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 ${
              msg.senderId !== authUser._id
                ? "flex-row-reverse justify-end"
                : "justify-end"
            }`}>
            {msg.image ? (
              <img
                src={msg.image}
                className="max-w-[230px] rounded-lg border border-purple-400"
              />
            ) : (
              <p
                className={`p-2 text-sm rounded-lg max-w-xs break-words ${
                  msg.senderId !== authUser._id
                    ? "bg-indigo-500/20 rounded-bl-none"
                    : "bg-purple-600/20 rounded-br-none"
                }`}>
                {msg.text}
              </p>
            )}
            <div className="text-center text-xs text-gray-400">
              <img
                src={
                  msg.senderId === authUser._id
                    ? authUser?.profilePic || assets.avatar_icon
                    : selectedUser?.profilePic || assets.avatar_icon
                }
                alt=""
                className="w-6 h-6 rounded-full mb-1"
              />
              <p>{formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* Input Section */}
      <div className="p-3 bg-black/30">
        <div className="bg-white/10 flex items-center px-4 py-2 rounded-full backdrop-blur-md shadow-inner gap-3">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) =>
              e.key === "Enter" ? handleSendMessages(e) : null
            }
            type="text"
            placeholder="Write a message..."
            className="flex-1 bg-transparent text-white text-sm placeholder-gray-400 outline-none"
          />
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={assets.gallery_icon}
              alt="gallery"
              className="w-4.5 hover:scale-110 transition"
            />
            <input
              onChange={handleSendImage}
              type="file"
              id="image"
              accept="image/*"
              hidden
            />
          </label>
          <img
            onClick={handleSendMessages}
            src={assets.send_button}
            alt="send"
            className="w-6 cursor-pointer hover:scale-110 transition"
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-black text-white gap-4">
      <img src={assets.logo_icon} alt="logo" className="w-14" />
      <p className="text-lg font-light">Select a chat to continue...</p>
    </div>
  );
};

export default ChatContainer;
