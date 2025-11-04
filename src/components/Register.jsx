import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../utils/localStorageUtils";

function Register() {
  const [role, setRole] = useState("hr");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!id || !name || !password) {
      alert("Fill all fields");
      return;
    }
    const result = saveUser({ id, name, password, role });
    if (result) {
      alert("Registered! Please login.");
      navigate("/");
    } else {
      alert("User ID already exists");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="hr">HR</option>
        <option value="student">Student</option>
      </select>
      <input placeholder="ID" value={id} onChange={e => setId(e.target.value)} />
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <p>
        Have account? <a href="/">Login</a>
      </p>
    </div>
  );
}

export default Register;
