import { useContext, useEffect, useState } from "react";
import api from "../services/api";
import {
  FaLaptopCode,
  FaBookOpen,
  FaChartLine,
  FaTrophy,
  FaUserCircle,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaClipboardList,
  FaMedal,
  FaHistory,
  FaUserShield,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

function Dashboard() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const user = JSON.parse(localStorage.getItem("user"));
const [stats, setStats] = useState({
  solved: 0,
  accuracy: 0,
  rank: "-",
});

useEffect(() => {
  loadStats();
}, []);

const loadStats = async () => {
  try {
    const res = await api.get(`/progress/stats/${user.id}`);
    setStats(res.data);
  } catch (err) {
    console.log(err);
  }
};
  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div className="container py-5">

      {/* Theme Button */}

      <div className="d-flex justify-content-end mb-4">

        <button
          className="btn btn-dark rounded-pill px-4 py-2"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <>
              <FaMoon className="me-2" />
              Dark Mode
            </>
          ) : (
            <>
              <FaSun className="me-2" />
              Light Mode
            </>
          )}
        </button>

      </div>

      {/* Welcome */}

      <div className="welcome-card shadow-lg mb-5">

        <div className="row align-items-center g-3">
          <div className="col-lg-9">

            <h1 className="fw-bold" style={{ fontSize: "52px" }}>
              👋 Welcome, {user?.name}
            </h1>

            <p className="fs-5 mt-2">
              {user?.email}
            </p>

            <h5 className="mt-3">
              🚀 Ready to crack your dream company?
            </h5>

          </div>

          <div className="col-lg-3 text-center">

  <div className="col-lg-3 text-center">
  <img
  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  alt="Student"
  style={{
    width: "150px",
    height: "150px",
    objectFit: "contain",
  }}
/>
</div>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="row g-4 mb-5">

       <StatCard
  color="primary"
  icon={<FaClipboardList />}
  number={stats.solved}
  text="Questions Solved"
/>

<StatCard
  color="success"
  icon={<FaBookOpen />}
  number={`${stats.accuracy}%`}
  text="Quiz Accuracy"
/>

<StatCard
  color="warning"
  icon={<FaMedal />}
  number={`#${stats.rank}`}
  text="Leaderboard Rank"
/>

      </div>

      {/* Dashboard */}

      <div className="row g-4">

        <DashboardCard
          color="primary"
          icon={<FaLaptopCode />}
          title="DSA Practice"
          desc="Solve coding questions"
          onClick={() => navigate("/dsa")}
        />

        <DashboardCard
          color="success"
          icon={<FaBookOpen />}
          title="MCQ Quiz"
          desc="Practice quizzes"
          onClick={() => navigate("/quiz")}
        />

        <DashboardCard
          color="warning"
          icon={<FaChartLine />}
          title="Progress"
          desc="Track your learning"
          onClick={() => navigate("/progress")}
        />

        <DashboardCard
          color="danger"
          icon={<FaTrophy />}
          title="Leaderboard"
          desc="Compare rankings"
          onClick={() => navigate("/leaderboard")}
        />

        <DashboardCard
          color="info"
          icon={<FaUserCircle />}
          title="Profile"
          desc="Manage account"
          onClick={() => navigate("/profile")}
        />

        <DashboardCard
          color="secondary"
          icon={<FaHistory />}
          title="Quiz History"
          desc="View quiz attempts"
          onClick={() => navigate("/quiz-history")}
        />

        {user?.isAdmin && (

          <DashboardCard
            color="dark"
            icon={<FaUserShield />}
            title="Admin Panel"
            desc="Manage Questions"
            onClick={() => navigate("/admin")}
          />

        )}

        <DashboardCard
          color="dark"
          icon={<FaSignOutAlt />}
          title="Logout"
          desc="Sign out safely"
          onClick={logout}
        />

      </div>

    </div>
  );
}

/* ---------------- Statistics Card ---------------- */

function StatCard({ icon, number, text, color }) {
  return (
    <div className="col-md-4">

      <div className={`stats-card bg-${color}`}>

        <div className="icon-circle bg-white text-dark mb-3">
          {icon}
        </div>

        <h2>{number}</h2>

        <p>{text}</p>

      </div>

    </div>
  );
}

/* ---------------- Dashboard Card ---------------- */

function DashboardCard({
  icon,
  title,
  desc,
  onClick,
  color,
}) {
  return (
    <div className="col-lg-4 col-md-6">

      <div
  className="dashboard-card shadow"
  onClick={onClick}
  style={{ cursor: "pointer" }}
>

        <div className={`icon-circle bg-${color}`}>

          {icon}

        </div>

        <h3 className="mt-4">
          {title}
        </h3>

        <p>{desc}</p>

      </div>

    </div>
  );
}

export default Dashboard;