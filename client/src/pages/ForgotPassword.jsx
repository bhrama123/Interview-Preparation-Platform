import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();

    try {
      await api.post("/password/forgot-password", { email });

      alert("OTP sent to your email");

      navigate("/verify-otp", {
        state: { email },
      });

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container py-5">

      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "450px" }}>

        <h2 className="text-center mb-4">
          Forgot Password
        </h2>

        <form onSubmit={sendOtp}>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100">
            Send OTP
          </button>

        </form>

      </div>

    </div>
  );
}

export default ForgotPassword;