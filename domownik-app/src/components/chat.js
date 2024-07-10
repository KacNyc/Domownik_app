// Chat.js

import React, { useState, useEffect } from 'react';
import '../styles/components/_chat.scss'; // Importujemy styl CSS

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const handleInputChange = (event) => {
        setInputMessage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputMessage.trim() !== '') {
            const newMessage = {
                id: messages.length + 1,
                text: inputMessage,
                userId: 1,
            };
            setMessages([...messages, newMessage]);
            setInputMessage('');
        }
    };

    return (
        <div className="chat-container">
            <div className="messages-container">
                {messages.map((message) => (
                    <div key={message.id} className="message">
                        <p className="message-text">{message.text}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="message-form">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={handleInputChange}
                    placeholder="Wpisz wiadomość..."
                    className="message-input"
                />
                <button type="submit" className="send-button">Wyślij</button>
            </form>
        </div>
    );
};

export default Chat;
