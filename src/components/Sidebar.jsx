import React from "react";
import assets, { userDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ selectedChat, setSelectedChat }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`bg-primary-dark/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${
        selectedChat ? "max-md:hidden" : ""
      }`}>
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-dark">
            Chat<span className="text-primary-light">Me</span>
          </h1>
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="menu"
              className="max-h-5 cursor-pointer"
            />
            <div className="absolute right-0 top-full z-20 bg-primary-light/90 backdrop-blur-md rounded-lg shadow-lg w-[100px] p-4 hidden group-hover:block ">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm">
                Edit Profile
              </p>
              <hr className="my-2 border-t border-white" />
              <p className="cursor-pointer text-sm">Logout</p>
            </div>
          </div>
        </div>
        {/* search chats */}
        <div className="bg-primary-light/40 rounded-full flex items-center gap-2 px-3 py-2 mt-4">
          <img src={assets.search_icon} alt="search" className="w-3" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-white text-xs placeholder:text-white/50 flex-1"
            placeholder="Search Chats"
          />
        </div>
      </div>

      {/* show chats */}
      <div className="flex flex-col">
        {userDummyData.map((user, index) => (
          <div
            key={index}
            onClick={() => setSelectedChat(user)}
            className={`relative flex items-center gap-2 p-2 rounded-lg hover:bg-primary-light/10 cursor-pointer ${
              selectedChat?._id === user._id ? "bg-primary-light/10" : ""
            }`}>
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt="user"
              className="w-10 h-10 rounded-full mb-2"
            />
            <div className="flex flex-col leading-5">
              <p>{user.fullName}</p>
              {index < 3 ? (
                <span className="text-xs text-secondary-light">Online</span>
              ) : (
                <span className="text-xs text-primary-light">Offline</span>
              )}
            </div>
            {index > 2 && (
              <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center  items-center rounded-full bg-primary-dark">
                {index}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
