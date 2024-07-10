// login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/_login.scss'; // Importuj swój gotowy plik _login.scss
import logoImage from '../../assets/task-manager-done-manager-task-svgrepo-com.svg';

// Lista użytkowników z przykładowymi danymi
const users = [
    { email: 'user1@example.com', pin: '!1357' },
    { email: 'user2@example.com', pin: '1357' },
    { email: 'user3@example.com', pin: '1357' },
    { email: 'user4@example.com', pin: '1357' }
];

const Login = () => {
    const [email, setEmail] = useState(''); // Stan do przechowywania wpisanego emaila
    const [pin, setPin] = useState(''); // Stan do przechowywania wpisanego PINu
    const [error, setError] = useState(''); // Stan do przechowywania błędów logowania
    const navigate = useNavigate(); // Hook do nawigacji

    // Funkcja obsługująca logowanie
    const handleLogin = () => {
        // Sprawdzenie, czy użytkownik istnieje w liście użytkowników
        const user = users.find(u => u.email === email && u.pin === pin);
        if (user) {
            localStorage.setItem('isAuthenticated', 'true'); // Ustawienie flagi autoryzacji w localStorage
            navigate('/'); // Przekierowanie na stronę główną
        } else {
            setError('Invalid email or pin'); // Ustawienie komunikatu o błędzie
        }
    };

    // Funkcja obsługująca naciśnięcie klawisza Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin(); // Wywołanie funkcji logowania
        }
    };

    return (
        <div className="login-container">
            <div className="logo">
                <img src={logoImage} alt="Logo" />
                <h1>Domownik</h1>
            </div>
            <div className="form-container">
                <div className="input-container">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress} // Dodanie obsługi naciśnięcia klawisza Enter
                    />
                    <input
                        type="password"
                        placeholder="PIN"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        onKeyPress={handleKeyPress} // Dodanie obsługi naciśnięcia klawisza Enter
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <div className="button-container">
                    <button onClick={handleLogin}>Zaloguj</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
