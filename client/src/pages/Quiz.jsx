import { useState, useEffect } from "react";
import api from "../services/api";

function Quiz() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    try {
      const res = await api.get("/quiz");

      console.log("Quiz Questions:", res.data);

      setQuestions(res.data);
      setCurrent(0);
      setScore(0);
      setLoading(false);
    } catch (err) {
      console.log("Load Quiz Error:", err);
      alert("Failed to load quiz");
      setLoading(false);
    }
  };

  const checkAnswer = async (option) => {
    let newScore = score;

    if (option === questions[current].answer) {
      newScore++;
      setScore(newScore);
    }

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      console.log("Quiz Finished");

      console.log("User:", user);

      const payload = {
        userId: user?._id || user?.id,
        score: newScore,
        total: questions.length,
      };

      console.log("Sending Payload:", payload);

      try {
        const response = await api.post("/quiz", payload);

        console.log("Server Response:", response.data);

        alert(
          `🎉 Quiz Finished!\n\nScore: ${newScore}/${questions.length}`
        );

        loadQuiz();
      } catch (err) {
        console.log("POST ERROR:", err);

        if (err.response) {
          console.log("Status:", err.response.status);
          console.log("Response:", err.response.data);
        }

        alert("Failed to save quiz result");
      }
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading Quiz...</h3>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3>No Quiz Questions Found.</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow p-5">
        <h2 className="text-center mb-4">
          Question {current + 1} / {questions.length}
        </h2>

        <h4 className="mb-4 text-center">
          {questions[current].question}
        </h4>

        {questions[current].options.map((option, index) => (
          <button
            key={index}
            className="btn btn-primary w-100 my-2"
            onClick={() => checkAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Quiz;