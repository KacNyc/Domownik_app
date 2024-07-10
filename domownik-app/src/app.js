// app.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Chat from './components/chat';
import Gallery from './components/gallery';
import Users from './components/users';
import Login from './components/login';

import './styles/main.scss';
import './styles/_global.scss';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="*"
                    element={
                        <PrivateRoute>
                            <div>
                                <Navbar />
                                <main>
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/chat" element={<Chat />} />
                                        <Route path="/gallery" element={<Gallery />} />
                                        <Route path="/users" element={<Users />} />
                                    </Routes>
                                </main>
                            </div>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));