import React, { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/util";

const ChatContainer = ({ selectedChat, setSelectedChat }) => {
  const scrollEnd = useRef();
  // Scroll to the bottom of the chat when the component mounts
  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

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
      {/* chat area */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messagesDummyData.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${
              msg.senderId !== "680f50e4f10f3cd28382ecf9" && "flex-row-reverse"
            }`}>
            {msg.image ? (
              <img
                src={msg.image}
                className="max-w-[230px] border border-primary rounded-lg overflow-hidden mb-8"
              />
            ) : (
              <p
                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                  msg.senderId !== "680f50e4f10f3cd28382ecf9"
                    ? "rounded-bl-none"
                    : "rounded-br-none"
                }`}>
                {msg.text}
              </p>
            )}
            <div className="text-center text-xs">
              <img
                src={
                  msg.senderId === "680f50e4f10f3cd28382ecf9"
                    ? assets.avatar_icon
                    : assets.profile_martin
                }
                alt=""
                className="w-6 rounded-full mb-1"
              />
              <p className="text-gray-500">
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* bottom area */}
      <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center bg-primary-light/5 ">
        <div className="w-full flex justify-between items-center gap-1 bg-white rounded-full px-3 py-2 shadow-md">
          <input
            type="text"
            placeholder="Write a message"
            className="outline-none"
          />
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="image"
              accept="image/png ,image/jpeg"
              hidden
            />
            <label htmlFor="image">
              <div className="w-6 bg-gradient-to-r from-purple-400 to-violet-600 rounded-full p-1.5">
                <img
                  src={assets.gallery_icon}
                  alt=""
                  className="cursor-pointer"
                />
              </div>
            </label>
            <img
              src={assets.send_button}
              alt=""
              className="w-6 cursor-pointer"
            />
          </div>
        </div>
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
