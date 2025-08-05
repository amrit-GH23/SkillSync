import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const API_BASE_URL = import.meta.env.VITE_API_URL;

const Chat = () => {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const user= useAuth();
  if (!user) {
    navigate("/login");
    return null;
  }
  
  // Fetch/Create chat when component mounts
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login");
      return;
    }

    const onChat = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/chat/`,
          { userId: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const chatID = response.data.chat_id;
        console.log("Chat ID:", chatID);
        setChatId(chatID);
      } catch (error) {
        console.error('Error creating chat:', error);
      }
       finally {
      setLoading(false);
    }
    };

    onChat();
  }, [id, navigate]);

  
  useEffect(() => {
    if (!chatId) return;
    const token = localStorage.getItem("access");

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/getMessages/${chatId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 6000);

    return () => clearInterval(interval);
  }, [chatId]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Send new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login");
      return;
    }
  // const sender = localStorage.getItem("user_id"); // Or from context/state
  // const receiver = id;

  try {
    await axios.post(
      `${API_BASE_URL}/api/sendMessage/`,
      {
        message: newMessage,
        chatRoom: chatId,
        receiver: id,
        sender: user.user.user_id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setNewMessage('');
  } catch (error) {
    console.error('Error sending message:', error);
  }
  };

  return (
      <>
      {loading && (
        <div className="min-h-screen flex justify-center items-center py-12 sm:py-20 px-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
            <span className="text-slate-600 font-medium text-sm sm:text-base text-center">Loading chat...</span>
          </div>
        </div>
      )}
      {!loading && (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-800 text-white'>
      <h1 className='text-3xl font-bold m-4'>CHAT</h1>
      <div className='flex flex-col bg-gray-900 p-6 rounded-lg shadow-lg w-[80%] h-[80vh]'>
        
        <div className='flex-grow overflow-y-auto mb-4 border border-gray-700 rounded p-3'>
        {messages.map((msg, index) => {
          const isCurrentUser = msg.sender === user.user.user_id;
  return (
    <div
      key={index}
      className={`mb-3 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[70%] p-3 rounded-lg shadow-md ${
        isCurrentUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'
      }`}
      >
        <div className="text-xs text-gray-300 mb-1">
          {isCurrentUser ? 'You' : msg.sender_name}
        </div>
        <div className="break-words">{msg.message}</div>
      </div>
    </div>
  );
})}
          <div ref={messagesEndRef}></div>
        </div>

        <div className='flex items-center gap-2'>
          <input
            type="text"
            placeholder='Type your message...'
            className='w-full p-2 bg-gray-600 text-white rounded outline-none'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
      )}
    </>
  );
};

export default Chat;
