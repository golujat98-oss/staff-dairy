import React, { useState } from "react";
import "./login.css";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");

  function handleLogin() {
    if (phone === "" || pass === "") {
      alert("Please enter phone & password!");
      return;
    }
    localStorage.setItem("admin_token", "active");
    window.location.href = "/dashboard";
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">

        {/* App Logo */}
        <div className="logo-circle">
          <span className="material-icons">lock</span>
        </div>

        <h2 className="login-title">Staff Diary Login</h2>

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
