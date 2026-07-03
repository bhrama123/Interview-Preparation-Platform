import { useEffect, useState } from "react";
import api from "../services/api";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const res = await api.get("/leaderboard");
      setLeaders(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load leaderboard");
    }
  };

  return (
    <div className="container py-5">

      <h1 className="text-center text-danger fw-bold mb-5">
        🏆 Leaderboard
      </h1>

      <div className="table-responsive">

        <table className="table table-bordered table-hover shadow">

          <thead className="table-dark">
            <tr>
              <th>🏅 Rank</th>
              <th>👤 Name</th>
              <th>📧 Email</th>
              <th>✅ Questions Solved</th>
            </tr>
          </thead>

          <tbody>

            {leaders.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No Data Available
                </td>
              </tr>
            ) : (
              leaders.map((user, index) => (
                <tr key={index}>

                  <td>
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : index + 1}
                  </td>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>
                    <span className="badge bg-success fs-6">
                      {user.solved}
                    </span>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Leaderboard;