import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, error }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.token) {
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/profile');
          } else {
            setError(data.message);
          }
        })
        .catch(err => setError('Failed to login.'));
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div>
          <p>Welcome back! 👋</p>
          <h2 className="heading">Sign in to your account</h2>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Continue</button>
          {error && <p>{error}</p>}
            <p className="password">Forget your password?</p>
        </div>
        <div >
          <h6 className="sign-up">Don’t have an account? Sign up</h6>
        </div>
      </div>
    </div>
  );
};

export default Login;
