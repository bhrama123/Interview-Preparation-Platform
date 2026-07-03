import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Progress() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [progress, setProgress] = useState([]);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const res = await api.get(`/progress/${user.id}`);
      setProgress(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const easy = progress.filter(q => q.difficulty === "Easy").length;
  const medium = progress.filter(q => q.difficulty === "Medium").length;
  const hard = progress.filter(q => q.difficulty === "Hard").length;

  const pieData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: [easy, medium, hard],
        backgroundColor: [
          "#22c55e",
          "#facc15",
          "#ef4444",
        ],
      },
    ],
  };

  const topicMap = {};

  progress.forEach((q) => {
    topicMap[q.topic] = (topicMap[q.topic] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(topicMap),
    datasets: [
      {
        label: "Solved",
        data: Object.values(topicMap),
        backgroundColor: "#2563eb",
      },
    ],
  };

  return (
    <div className="container py-5">

      <h1 className="text-center mb-5">
        📈 Progress Dashboard
      </h1>

      <div className="row">

        <div className="col-lg-6">

          <div className="card shadow p-4">

            <h3 className="text-center">
              Difficulty Wise
            </h3>

            <Pie data={pieData} />

          </div>

        </div>

        <div className="col-lg-6">

          <div className="card shadow p-4">

            <h3 className="text-center">
              Topic Wise
            </h3>

            <Bar data={barData} />

          </div>

        </div>

      </div>

      <div className="card shadow p-4 mt-5">

        <h3>Total Solved : {progress.length}</h3>

      </div>

    </div>
  );
}

export default Progress;