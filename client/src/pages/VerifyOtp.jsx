import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");

  const verifyOtp = async (e) => {
    e.preventDefault();

    try {

      await api.post("/password/verify-otp", {
        email,
        otp,
      });

      alert("OTP Verified");

      navigate("/reset-password", {
        state: { email },
      });

    } catch (err) {

      alert(err.response?.data?.message || "Invalid OTP");

    }
  };

  return (
    <div className="container py-5">

      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "450px" }}>

        <h2 className="text-center mb-4">
          Verify OTP
        </h2>

        <form onSubmit={verifyOtp}>

          <input
            className="form-control mb-3"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button className="btn btn-success w-100">
            Verify OTP
          </button>

        </form>

      </div>

    </div>
  );
}

export default VerifyOtp;