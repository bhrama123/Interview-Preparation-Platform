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

      const res = await api.get(`/quizresults/${user.id}`);

      setResults(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container py-5">

      <h1 className="text-center mb-5">
        📝 Quiz History
      </h1>

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

          {results.map((item, index) => (

            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.score}</td>
              <td>{item.total}</td>
              <td>
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default QuizHistory;