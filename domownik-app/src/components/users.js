// users.js

import React, { useState, useEffect } from 'react';
import '../styles/components/_users.scss'; // Import stylów / Styles import
import { AvatarGenerator } from 'random-avatar-generator'; // Import generatora avatarów / Import of avatar generator

const Users = () => {
    const [users, setUsers] = useState(() => {
        // Retrieve users from localStorage or return an empty array
        // Pobieramy użytkowników z localStorage lub zwracamy pustą tablicę
        const savedUsers = localStorage.getItem('users');
        return savedUsers ? JSON.parse(savedUsers) : [];
    });
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const generator = new AvatarGenerator();

    // Save users to localStorage after the change
    // Zapisujemy użytkowników do localStorage po zmianie
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    const addUser = () => {
        if (email && nickname) {
            const newUser = {
                id: Math.random().toString(36).substr(2, 9),
                email,
                nickname,
                avatar: generator.generateRandomAvatar(), // Generowanie losowego avatara / Generation of a random avatar
            };
            setUsers([...users, newUser]);
            setEmail('');
            setNickname('');
        }
    };

    const removeUser = (userId) => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addUser();
        }
    };

    return (
        <div className="users-container">
            <h2>Dodawanie i usuwanie użytkowników</h2>

            <div className="user-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <input
                    type="text"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={addUser}>Dodaj użytkownika</button>
            </div>

            <div className="user-list">
                {users.map((user) => (
                    <div className="user-item" key={user.id}>
                        <div className="user-avatar">
                            <img src={user.avatar} alt="Avatar" />
                        </div>
                        <div className="user-details">
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Nickname:</strong> {user.nickname}</p>
                        </div>
                        <span className="delete-icon" onClick={() => removeUser(user.id)}></span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;
