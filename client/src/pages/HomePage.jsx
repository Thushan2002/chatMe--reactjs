import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import { ChatContext } from "../context/ChatContext";
import RightSidebar from "../components/RightSidebar";

const HomePage = () => {
  const { selectedUser, setSelectedUser } = useContext(ChatContext);

  return (
    <div className="border w-full h-screen">
      <div
        className={`backdrop-blur-xl overflow-hidden h-[100%] grid grid-cols-1 relative ${
          selectedUser ? "md:grid-cols-3" : "md:grid-cols-2"
        }`}>
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
