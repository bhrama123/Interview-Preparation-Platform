import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("🎉 Login Successful!");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow-lg p-4">

            <h2 className="text-center text-primary mb-4">
              Welcome Back 👋
            </h2>

            <form onSubmit={loginUser}>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Login
              </button>

            </form>

            <hr />

            <p className="text-center mb-0">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-decoration-none fw-bold"
              >
                Register
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;