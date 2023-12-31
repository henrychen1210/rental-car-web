import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import chatImage from "../chat.png";
import closeImage from "../close.png";
import sendImage from "../send.png";

const ChatBox = ({ messages, handleSubmit, prompt, setPrompt, onClose }) => {
  // Create a ref for the last message element
  const lastMessageRef = useRef(null);

  // Use useEffect to scroll to the bottom whenever messages are updated
  useEffect(() => {
    // Scroll to the bottom when a new message is added
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
    <div className="chat-box">
      <div className="chat-box-head">
        <button className="close-button" onClick={onClose}>
          <img src={closeImage} alt='close'></img>
        </button>
        <span>Helper</span>
      </div>
      
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            className={`message ${message.sender === 'user' ? 'user-message' : 'chatbot-message'}`}
          >
            {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className='chat-form'>
        <label htmlFor="input"></label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">
          <img src={sendImage} alt="" className='chat-send-icon'/>
        </button>
      </form>
    </div>
    </>
  );
};

const ChatGPT = () => {
  const [prompt, setPrompt] = useState('');
  const [showChatBox, setShowChatBox] = useState(false);
  const [messages, setMessages] = useState([]);
  const apiKey = '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';

  const toggleChatBox = () => {
    setShowChatBox((prev) => !prev);
  };

  const handleCloseChatBox = () => {
    setShowChatBox(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add the user's input to the messages state
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', content: prompt },
    ]);

    let promptData = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    };

    setPrompt('');

    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        promptData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      // Use the functional update to ensure you're working with the latest messages state
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'chatbot', content: res.data.choices[0].message.content },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button className="chat-button">
        {!showChatBox && (
          <img
            src={chatImage}
            alt=""
            className="chat-icon"
            onClick={toggleChatBox}
          />
        )}
      </button>
      {showChatBox && (
        <ChatBox
          messages={messages}
          handleSubmit={handleSubmit}
          prompt={prompt}
          setPrompt={setPrompt}
          onClose={handleCloseChatBox}
        />
      )}
    </div>
  );
};


export default ChatGPT;
