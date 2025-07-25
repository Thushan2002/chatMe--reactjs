import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";

const HomePage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="border w-full h-screen">
      <div
        className={`backdrop-blur-xl overflow-hidden h-[100%] grid grid-cols-1 relative ${
          selectedChat ? "md:grid-cols-3" : "md:grid-cols-2"
        }`}>
        <Sidebar
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
        <ChatContainer
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
        <RightSidebar
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
      </div>
    </div>
  );
};

export default HomePage;
