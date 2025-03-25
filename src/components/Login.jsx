import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styling
import logo from '../assets/logo-dappels-doffres.png'; // Import the logo

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const response = await loginApi(username, password); // Use the input values
        setMessage(response.message);
        if (response.success) {
            onLoginSuccess(response.token, response.tokenType);
        } else {
            // Optionally, handle unsuccessful login attempts
            setMessage("Nom d'utilisateur ou mot de passe invalide."); // Provide feedback in French
        }
        setLoading(false);
    };

    const loginApi = async (username, password) => {
        try {
            const res = await fetch('https://tenders.milkiya.ma/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ username, password }),
            });
            const data = await res.json();
            console.log(data); // Log the response for debugging
            if (res.ok) {
                return { success: true, token: data.access_token, tokenType: data.token_type };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: 'Échec de la connexion. Veuillez réessayer.' }; // Error message in French
        }
    };

    return (
        <div className="login-container unique-login">
            <img src={logo} alt="Logo d'Appels d'Offres" className="logo" /> {/* Add logo here */}
            <h2>Connexion</h2> {/* Title in French */}
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label>Nom d'utilisateur:</label> {/* Label in French */}
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Mot de passe:</label> {/* Label in French */}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Connexion en cours...' : 'Se connecter'} {/* Button text in French */}
                </button>
            </form>
            {message && <p className="message">{message}</p>} {/* Message in French */}
        </div>
    );
};

export default Login; 