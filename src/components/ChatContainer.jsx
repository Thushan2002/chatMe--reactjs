import React from "react";
import assets from "../assets/assets";

const ChatContainer = ({ selectedChat, setSelectedChat }) => {
  return selectedChat ? (
    <div className="h-full overflow-scroll relative backdrop-blur-2xl">
      <div className="flex items-center py-3 mx-4 border-gray-100 border-b">
        <img src={assets.profile_martin} alt="" className="w-8 rounded-full" />
        <p className="flex-1 text-sm text-white flex items-center gap-2">
          Joe Root{" "}
          <span className="w-2 h-2 rounded-full bg-secondary-light"></span>
        </p>
        <img
          onClick={() => setSelectedChat(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden max-w-7"
        />
        <img src={assets.help_icon} alt="" className="max-md:hidden max-w-5" />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-full gap-4 bg-primary-light/5">
      <img src={assets.logo_icon} alt="" className="max-w-16" />
      <p className="text-lg font-medium text-white">
        Select chat to Continue..
      </p>
    </div>
  );
};

export default ChatContainer;
