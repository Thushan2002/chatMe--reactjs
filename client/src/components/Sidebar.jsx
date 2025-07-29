import React, { useEffect, useRef, useState } from "react";
import assets, { userDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = ({ selectedChat, setSelectedChat }) => {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef();

  return (
    <div
      className={`bg-gradient-to-b from-gray-800 to-black h-full text-white p-5 ${
        selectedChat ? "max-md:hidden" : ""
      }`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">
          Chat<span className="text-indigo-400">Me</span>
        </h1>
        <div className="relative group">
          <img
            onClick={() => setOpenProfile((prev) => !prev)}
            src={assets.menu_icon}
            alt="menu"
            className="w-5 cursor-pointer"
          />
          {openProfile && (
            <div
              ref={profileRef}
              className="absolute right-0 top-full mt-2 bg-white/10 backdrop-blur-md rounded shadow-lg w-32 p-2">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm hover:text-indigo-300">
                Edit Profile
              </p>
              <hr className="my-2 border-gray-600" />
              <p
                onClick={() => logoutUser()}
                className="cursor-pointer text-sm hover:text-indigo-300">
                Logout
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-2 mb-4">
        <img src={assets.search_icon} alt="search" className="w-3" />
        <input
          type="text"
          placeholder="Search chats"
          className="bg-transparent outline-none text-sm placeholder-white/50 w-full"
        />
      </div>

      {/* Chat List */}
      <div className="space-y-3">
        {userDummyData.map((user, index) => (
          <div
            key={user._id}
            onClick={() => setSelectedChat(user)}
            className={`flex items-center gap-3 p-2 border-b border-white/10 rounded-lg cursor-pointer hover:bg-white/10 ${
              selectedChat?._id === user._id ? "bg-white/10" : ""
            }`}>
            <img
              src={user.profilePic || assets.avatar_icon}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col text-sm">
              <p className="font-medium">{user.fullName}</p>
              <span
                className={`${
                  index < 3 ? "text-green-400" : "text-gray-400"
                } text-xs`}>
                {index < 3 ? "Online" : "Offline"}
              </span>
            </div>
            {index > 2 && (
              <div className="ml-auto w-5 h-5 bg-indigo-600 text-xs flex items-center justify-center rounded-full">
                {index}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
