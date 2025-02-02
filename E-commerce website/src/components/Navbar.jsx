import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">E-Commerce</div>
            <div className="menu">
                <a href="/">Home</a>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>
        </nav>
    );
};

export default Navbar;