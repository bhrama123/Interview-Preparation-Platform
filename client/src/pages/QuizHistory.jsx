import { useEffect, useState } from "react";
import api from "../services/api";

function QuizHistory() {
  const [results, setResults] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      if (!user?.id) {
        console.log("User not found");
        return;
      }

      const res = await api.get(`/quizresults/${user.id}`);

      console.log("Quiz Results:", res.data);

      setResults(res.data);
    } catch (err) {
      console.log("Quiz History Error:", err);
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Date Not Available";
    }

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) {
      return "Date Not Available";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">
        📝 Quiz History
      </h1>

      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Score</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {results.length > 0 ? (
              results.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>

                  <td>{item.score}</td>

                  <td>{item.total}</td>

                  <td>{formatDate(item.date)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Quiz History Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QuizHistory;