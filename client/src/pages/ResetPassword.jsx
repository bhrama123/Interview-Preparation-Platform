import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {

  const location = useLocation();

  const navigate = useNavigate();

  const email = location.state?.email;

  const [password, setPassword] = useState("");

  const resetPassword = async (e) => {

    e.preventDefault();

    try {

      await api.post("/password/reset-password", {
        email,
        password,
      });

      alert("Password Updated Successfully");

      navigate("/login");

    } catch (err) {

      alert(err.response?.data?.message || "Error");

    }

  };

  return (

    <div className="container py-5">

      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "450px" }}>

        <h2 className="text-center mb-4">
          Reset Password
        </h2>

        <form onSubmit={resetPassword}>

          <input
            type="password"
            className="form-control mb-3"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-danger w-100">
            Update Password
          </button>

        </form>

      </div>

    </div>

  );
}

export default ResetPassword;