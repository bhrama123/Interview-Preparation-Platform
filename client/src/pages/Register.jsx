import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Create Account 🚀
            </h2>

            <form onSubmit={registerUser}>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                className="btn btn-success w-100"
                type="submit"
              >
                Register
              </button>

            </form>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/login">
                Login
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;