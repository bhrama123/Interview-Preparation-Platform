import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Admin() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);

  const [form, setForm] = useState({
    title: "",
    topic: "",
    difficulty: "Easy",
    company: "",
    link: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const res = await api.get("/questions");
      setQuestions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(`/questions/${editId}`, form);
        alert("✅ Question Updated Successfully");
      } else {
        await api.post("/questions", form);
        alert("✅ Question Added Successfully");
      }

      setForm({
        title: "",
        topic: "",
        difficulty: "Easy",
        company: "",
        link: "",
      });

      setEditId(null);

      loadQuestions();

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Server Error");
    }
  };

  const handleEdit = (question) => {
    setEditId(question._id);

    setForm({
      title: question.title,
      topic: question.topic,
      difficulty: question.difficulty,
      company: question.company,
      link: question.link,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) return;

    try {
      await api.delete(`/questions/${id}`);

      alert("🗑️ Question Deleted");

      loadQuestions();

    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  return (
    <div className="container py-5">

      <h1 className="text-center text-primary mb-4">
        👨‍💻 Admin Panel
      </h1>

      <div className="text-end mb-4">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin-dashboard")}
        >
          📊 View Dashboard
        </button>
      </div>

      <div className="card shadow p-4 mb-5">

        <h3 className="mb-4">
          {editId ? "✏ Edit Question" : "➕ Add Question"}
        </h3>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Question Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Topic"
            value={form.topic}
            onChange={(e) =>
              setForm({ ...form, topic: e.target.value })
            }
            required
          />

          <select
            className="form-select mb-3"
            value={form.difficulty}
            onChange={(e) =>
              setForm({
                ...form,
                difficulty: e.target.value,
              })
            }
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Company (Amazon, Google, Microsoft...)"
            value={form.company}
            onChange={(e) =>
              setForm({
                ...form,
                company: e.target.value,
              })
            }
            required
          />

          <input
            type="url"
            className="form-control mb-3"
            placeholder="LeetCode Link"
            value={form.link}
            onChange={(e) =>
              setForm({
                ...form,
                link: e.target.value,
              })
            }
            required
          />

          <button className="btn btn-success me-2">
            {editId ? "Update Question" : "Add Question"}
          </button>

          {editId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setEditId(null);

                setForm({
                  title: "",
                  topic: "",
                  difficulty: "Easy",
                  company: "",
                  link: "",
                });
              }}
            >
              Cancel
            </button>
          )}

        </form>

      </div>

      <div className="card shadow p-4">

        <h3 className="mb-3">
          Total Questions: {questions.length}
        </h3>

        <table className="table table-bordered table-hover">

          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Topic</th>
              <th>Difficulty</th>
              <th>Company</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>

            {questions.map((q, index) => (

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
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(q)}
                  >
                    Edit
                  </button>
                </td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(q._id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Admin;