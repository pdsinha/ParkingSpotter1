import React, { useState } from 'react';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password: password }),
            });
            const data = await response.json();
            if (data.token) {
                // Login successful
                setMessage('Login successful!');
                console.log('Login Success:', data);
                // Redirect or do something else here
            } else {
                // Login failed
                setMessage('Invalid credentials!');
                console.log('Login Failed:', data);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred during login.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Username"
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
            <p>{message}</p>
        </div>
    );
}

export default LoginPage;