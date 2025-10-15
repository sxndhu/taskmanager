import React, {useState} from "react";
import api from '../api';
// import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login/", {username, password});
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            window.location.href = "/";
        } catch (err) {
            console.error(err);
            alert("Login failed. Check Credentials");
        }
    };

    return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  );

}