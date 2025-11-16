import React, { useState } from "react";
import "./login.css";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const sendOtp = () => {
    if (phone.length < 10) return alert("Enter valid phone number");
    setOtpSent(true);
  };

  const verifyOtp = () => {
    if (otp.length < 4) return alert("Enter OTP");
    alert("Login Successful!");
    window.location.href = "/dashboard";
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Staff Diary Login</h2>

        {!otpSent ? (
          <>
            <label>Phone Number</label>
            <input
              type="number"
              placeholder="Enter mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <button className="login-btn" onClick={sendOtp}>
              Send OTP
            </button>
          </>
        ) : (
          <>
            <label>Enter OTP</label>
            <input
              type="number"
              placeholder="Enter 4-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button className="login-btn" onClick={verifyOtp}>
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
