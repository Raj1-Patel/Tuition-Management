import React, { useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";
import { getUser, saveSession } from "../utils/localStorageUtils";

function Login() {
  const [role, setRole] = useState("hr");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = getUser(id, role);
    if (user && user.password === password) {
      saveSession({ id, role });
      navigate(role === "hr" ? "/hr" : "/student");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="hr">HR</option>
        <option value="student">Student</option>
      </select>
      <input placeholder="ID" value={id} onChange={e => setId(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>
        No account? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default Login;
