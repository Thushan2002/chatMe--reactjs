import React, { useContext, useEffect, useState } from "react";
import assets, { imagesDummyData } from "../assets/assets";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const RightSidebar = () => {
  const { messages, selectedUser } = useContext(ChatContext);
  const { logoutUser, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    const setImages = () => {
      try {
        if (messages) {
          setMsgImages(
            messages.filter((msg) => msg.image).map((msg) => msg.image)
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    setImages();
  }, [messages]);

  return (
    selectedUser && (
      <div className="bg-gradient-to-bl from-gray-900 to-black text-white w-full max-md:hidden p-4 overflow-y-auto">
        <div className="flex flex-col items-center gap-3">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            className="w-20 h-20 rounded-full"
            alt="profile"
          />
          <h2 className="text-xl font-medium flex items-center gap-2">
            <span
              className={`w-2 h-2 ${
                onlineUsers.includes(selectedUser._id)
                  ? "bg-green-400"
                  : "bg-gray-400"
              }  rounded-full`}></span>
            {selectedUser.fullName}
          </h2>
          <p className="text-sm text-gray-400 text-center px-4">
            {selectedUser.bio}
          </p>
        </div>

        <hr className="my-6 border-gray-700" />

        <div>
          <h3 className="text-indigo-300 text-lg mb-3">Shared Media</h3>
          <div className="grid grid-cols-2 gap-3 max-h-[200px] overflow-y-scroll pr-1">
            {msgImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="shared"
                className="rounded-lg cursor-pointer hover:opacity-80"
                onClick={() => window.open(img, "_blank")}
              />
            ))}
          </div>
        </div>

        <button
          onClick={() => logoutUser()}
          className="mt-10 mx-auto block bg-gradient-to-r from-purple-500 to-indigo-600 py-2 px-6 rounded-full text-sm">
          Logout
        </button>
      </div>
    )
  );
};

export default RightSidebar;
