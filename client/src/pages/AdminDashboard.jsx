import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuestions: 0,
    solvedQuestions: 0,
    totalQuizzes: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container py-5">

      <h1 className="text-center mb-5">
        📊 Admin Dashboard
      </h1>

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow text-center p-4">
            <h5>Total Users</h5>
            <h1>{stats.totalUsers}</h1>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-4">
            <h5>Questions</h5>
            <h1>{stats.totalQuestions}</h1>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-4">
            <h5>Solved</h5>
            <h1>{stats.solvedQuestions}</h1>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-4">
            <h5>Quiz Attempts</h5>
            <h1>{stats.totalQuizzes}</h1>
          </div>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;