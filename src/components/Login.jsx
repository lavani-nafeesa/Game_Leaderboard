import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const valid = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!valid) return alert("Invalid credentials");

    localStorage.setItem("loggedInUser", email);
    navigate("/leaderboard");
  };

  return (
    <div className="auth">
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      <p>
        New user? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;
