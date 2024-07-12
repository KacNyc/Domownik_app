// navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import '../styles/components/_navbar.scss'; // Import stylów

import taskManagerIcon from '../../assets/task-manager-done-manager-task-svgrepo-com.svg';

const Navbar = () => {
    const navigate = useNavigate(); // Hook do nawigacji / Hook for navigation

    // Funkcja obsługująca wylogowanie użytkownika
    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated'); // Usunięcie informacji o zalogowaniu z localStorage / Deletion of login information from localStorage
        navigate('/login'); // Przekierowanie użytkownika do strony logowania / Redirecting the user to the login page
    };

    return (
        <nav className="navbar">
            <div className="navbar__content container">
                {/* Logo przeniesione do Link w celu umożliwienia nawigacji / Logo moved to Link to enable navigation */}
                <Link to="/" className="navbar__logo">
                    <img src={taskManagerIcon} alt="Task Manager Icon" className="navbar__logo-image" />
                    <span className="navbar__logo-text">Domownik</span>
                </Link>
                <div className="navbar__menu">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/chat">Chat</Link></li>
                        <li><Link to="/gallery">Galeria</Link></li>
                        <li><Link to="/users">Domownicy</Link></li>
                    </ul>
                </div>
                <button className="logout-button" onClick={handleLogout}>Wyloguj</button>
                <div className="navbar__toggle">
                    <AiOutlineMenu />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
