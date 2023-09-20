import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import socketIOClient from 'socket.io-client';
import './Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
//   const socket = io('http://localhost:3000', {
//     transports: ['websocket'], // Use WebSocket transport
//   });
const socket = socketIOClient('http://localhost:3000',{
        transports: ['websocket'], // Use WebSocket transport
      });
  useEffect(() => {
    // Connect to the Socket.io server

    socket.on('connect' ,() =>{
        console.log("client connected");
    })

    // Listen for incoming messages
    socket.on('message', (newMessage) => {
      console.log("message received");
      // Update the state using a callback function
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      // Disconnect when the component unmounts
      socket.disconnect();
    };
  }, []); // The dependency array should be empty to run this effect only once

  function sendMessage() {
    console.log('message sent');
    socket.emit('message', message);
    console.log(socket);
    setMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div className='content' key={index}>{msg} uhuu</div>
        ))}
      </div>
      <input
        className='input'
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default Chat;
