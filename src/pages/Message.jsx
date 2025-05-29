import React, { useEffect, useState, useRef } from "react";

export default function Message() {
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetch("/data/message.json")
      .then((res) => res.json())
      .then((data) => {
        setChats(data.chats);
        setMessages(data.chats[0]?.messages || []);
        setSelectedChat(data.chats[0]);
      });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setMessages(chat.messages);
  };

  return (
    <div className="flex h-[90vh] bg-gray-50 rounded-2xl shadow overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 bg-white border-r flex flex-col">
        <div className="p-4">
          <input
            className="w-full px-4 py-2 rounded-lg bg-gray-100 text-sm"
            placeholder="Search name, chat, etc"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat, idx) => (
            <div
              key={chat.id || idx}
              onClick={() => handleChatSelect(chat)}
              className={`flex items-center px-4 py-3 cursor-pointer hover:bg-blue-50 ${
                selectedChat?.id === chat.id ? "bg-blue-50" : ""
              }`}
            >
              {chat.avatar ? (
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-lg font-bold text-white mr-3">
                  {chat.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-800 text-sm truncate">
                  {chat.name}
                </div>
                <div className="text-gray-500 text-xs truncate">
                  {chat.lastMessage}
                </div>
              </div>
              <div className="flex flex-col items-end ml-2">
                <span className="text-xs text-gray-400">
                  {chat.time}
                </span>
                {chat.unread > 0 && (
                  <span className="bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs mt-1">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <button className="m-4 bg-blue-500 text-white rounded-lg py-2 font-semibold">
          New Message
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center border-b px-6 py-4 bg-white">
          {selectedChat?.avatar ? (
            <img
              src={selectedChat.avatar}
              alt={selectedChat.name}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-lg font-bold text-white mr-3">
              {selectedChat?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
          )}
          <div>
            <div className="font-semibold">{selectedChat?.name}</div>
            <div className="text-xs text-gray-400">{selectedChat?.status}</div>
          </div>
          <div className="ml-auto text-gray-400 text-xl cursor-pointer">...</div>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-6 bg-gray-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex mb-4 ${msg.fromMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                  msg.fromMe
                    ? "bg-blue-100 text-gray-800 rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                <div>{msg.text}</div>
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {msg.time}
                  {msg.fromMe && (
                    <span className="ml-1 text-blue-400">✓✓</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input */}
        <div className="flex items-center border-t px-6 py-4 bg-white">
          <input
            className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-sm"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled
          />
          <button className="ml-3 bg-blue-500 p-2 rounded-full text-white" disabled>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}