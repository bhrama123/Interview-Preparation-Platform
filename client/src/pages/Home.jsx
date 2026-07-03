import { Link } from "react-router-dom";
import {
  FaLaptopCode,
  FaBookOpen,
  FaChartLine,
  FaTrophy,
  FaUserGraduate,
  FaRocket,
} from "react-icons/fa";

function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="text-center text-white py-5"
        style={{
          background: "linear-gradient(135deg,#2563eb,#0ea5e9)",
        }}
      >
        <div className="container">
          <h1 className="display-3 fw-bold">
            Interview Preparation Platform
          </h1>

          <p className="lead mt-3">
            Crack Product-Based Company Interviews 🚀
          </p>

          <p>
            1000+ Coding Questions • 200+ MCQs • Progress Tracker
          </p>

          <div className="mt-4">
            <Link
              to="/register"
              className="btn btn-warning btn-lg me-3"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="btn btn-outline-light btn-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-5">
          Everything You Need
        </h2>

        <div className="row g-4">

          <div className="col-md-4">
            <div className="card feature-card shadow text-center p-4 h-100">
              <FaLaptopCode
                size={60}
                className="text-primary mx-auto"
              />
              <h3 className="mt-3">DSA Practice</h3>
              <p>Solve coding questions by topic and company.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card feature-card shadow text-center p-4 h-100">
              <FaBookOpen
                size={60}
                className="text-success mx-auto"
              />
              <h3 className="mt-3">MCQ Quiz</h3>
              <p>Practice Computer Science interview questions.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card feature-card shadow text-center p-4 h-100">
              <FaChartLine
                size={60}
                className="text-warning mx-auto"
              />
              <h3 className="mt-3">Track Progress</h3>
              <p>Visualize your learning journey.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card feature-card shadow text-center p-4 h-100">
              <FaTrophy
                size={60}
                className="text-danger mx-auto"
              />
              <h3 className="mt-3">Leaderboard</h3>
              <p>Compete with other students.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card feature-card shadow text-center p-4 h-100">
              <FaUserGraduate
                size={60}
                className="text-info mx-auto"
              />
              <h3 className="mt-3">Profile</h3>
              <p>Manage your profile and achievements.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card feature-card shadow text-center p-4 h-100">
              <FaRocket
                size={60}
                className="text-secondary mx-auto"
              />
              <h3 className="mt-3">Placement Ready</h3>
              <p>Prepare for Amazon, Google, Microsoft and more.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Companies */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">
            Practice for Top Companies
          </h2>

          <div className="d-flex flex-wrap justify-content-center gap-4 fs-4 fw-bold text-secondary">
            <span>Amazon</span>
            <span>Google</span>
            <span>Microsoft</span>
            <span>Adobe</span>
            <span>Flipkart</span>
            <span>Walmart</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-center text-white py-4"
        style={{
          background: "#111827",
        }}
      >
        © 2026 Interview Preparation Platform | Built with ❤️ using MERN Stack
      </footer>
    </>
  );
}

export default Home;