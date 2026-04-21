import React, { useState, useEffect } from 'react';
import { getMessages, saveMessage, deleteMessage } from '../service/apiService';
import './MessageComponent.css';

const MessageComponent = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const data = await getMessages();
            setMessages(data);
        } catch (error) {
            console.error('Failed to fetch messages', error);
        }
    };

    const handleSaveMessage = async () => {
        try {
            await saveMessage(newMessage);
            fetchMessages();
            setNewMessage('');
        } catch (error) {
            console.error('Failed to save message', error);
        }
    };

    const handleDeleteMessage = async (id) => {
        try {
            await deleteMessage(id);
            fetchMessages();
        } catch (error) {
            console.error('Failed to delete message', error);
        }
    };

    return (
        <div className="message-container">
            <h1 className="message-title">Messages</h1>
            <ul className="message-list">
                {messages.map((message) => (
                    <li key={message.id} className="message-item">
                        <span className="message-content">{message.content}</span>
                        <button 
                            className="btn btn-delete" 
                            onClick={() => handleDeleteMessage(message.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <div className="input-section">
                <input
                    type="text"
                    className="message-input"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Enter new message"
                />
                <button className="btn btn-save" onClick={handleSaveMessage}>
                    Save Message
                </button>
            </div>
        </div>
    );
};

export default MessageComponent;