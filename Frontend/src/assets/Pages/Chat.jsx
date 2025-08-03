import React from 'react';

const Chat = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-800 text-white'>
      <h1 className='text-3xl font-bold m-4'>CHAT</h1>
      <div className='flex flex-col bg-gray-900 p-6 rounded-lg shadow-lg w-[80%] h-[80vh]'>
        
        <div className='flex-grow overflow-y-auto mb-4 border border-gray-700 rounded p-3'>
        </div>

        <div className='flex items-center gap-2'>
          <input
            type="text"
            placeholder='Type your message...'
            className='w-full p-2 bg-gray-600 text-white rounded outline-none'
          />
          <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
