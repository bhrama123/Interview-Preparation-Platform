import { useState, useEffect } from "react";
import api from "../services/api";

function DSAPractice() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [company, setCompany] = useState("All");

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const res = await api.get("/questions");
      setQuestions(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load questions");
    }
  };

  const markSolved = async (question) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first");
        return;
      }

      const res = await api.post("/progress", {
        userId: user.id,
        questionId: question._id,
        title: question.title,
        topic: question.topic,
        difficulty: question.difficulty,
      });

      alert(res.data.message);
    } catch (err) {
      console.log(err.response?.data || err);

      alert(
        err.response?.data?.message ||
          "Server Error! Check terminal for details."
      );
    }
  };

  const filteredQuestions = questions.filter((q) => {
    const matchSearch =
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.topic.toLowerCase().includes(search.toLowerCase());

    const matchTopic =
      topic === "All" || q.topic === topic;

    const matchDifficulty =
      difficulty === "All" ||
      q.difficulty === difficulty;

    const matchCompany =
      company === "All" ||
      q.company === company;

    return (
      matchSearch &&
      matchTopic &&
      matchDifficulty &&
      matchCompany
    );
  });

  return (
    <div className="container py-5">

      <h1 className="text-center text-primary fw-bold mb-4">
        💻 DSA Practice
      </h1>

      <div className="row g-3 mb-4">

        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Question..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option>All</option>
            <option>Arrays</option>
            <option>Strings</option>
            <option>Linked List</option>
            <option>Stack</option>
            <option>Trees</option>
            <option>Graphs</option>
          </select>
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value)
            }
          >
            <option>All</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={company}
            onChange={(e) =>
              setCompany(e.target.value)
            }
          >
            <option>All</option>
            <option>Amazon</option>
            <option>Google</option>
            <option>Microsoft</option>
            <option>Meta</option>
            <option>Apple</option>
            <option>Netflix</option>
            <option>TCS</option>
            <option>Infosys</option>
            <option>Wipro</option>
            <option>Accenture</option>
          </select>
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-danger w-100"
            onClick={() => {
              setSearch("");
              setTopic("All");
              setDifficulty("All");
              setCompany("All");
            }}
          >
            Reset
          </button>
        </div>

      </div>

      <h5 className="mb-3">
        Total Questions: {filteredQuestions.length}
      </h5>

      <div className="table-responsive">

        <table className="table table-bordered table-hover shadow">

          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Topic</th>
              <th>Difficulty</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredQuestions.map((q, index) => (

              <tr key={q._id}>

                <td>{index + 1}</td>

                <td>{q.title}</td>

                <td>{q.topic}</td>

                <td>
                  <span
                    className={
                      q.difficulty === "Easy"
                        ? "badge bg-success"
                        : q.difficulty === "Medium"
                        ? "badge bg-warning text-dark"
                        : "badge bg-danger"
                    }
                  >
                    {q.difficulty}
                  </span>
                </td>

                <td>{q.company}</td>

                <td>

                  <a
                    href={q.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm me-2"
                  >
                    Solve
                  </a>

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => markSolved(q)}
                  >
                    ✓ Solved
                  </button>

                </td>

              </tr>

            ))}

            {filteredQuestions.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center"
                >
                  No questions found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DSAPractice;