import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Badges from "../components/Badges";

import {
  FaUserCircle,
  FaEnvelope,
  FaLaptopCode,
  FaBookOpen,
  FaEdit,
} from "react-icons/fa";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState(null);
  const [solved, setSolved] = useState(0);

  useEffect(() => {
    loadProfile();
    loadProgress();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get(`/profile/${user.id}`);
      setProfile(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProgress = async () => {
    try {
      const res = await api.get(`/progress/${user.id}`);
      setSolved(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  if (!profile) {
    return (
      <div className="container mt-5 text-center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="card shadow-lg p-5">

        <div className="text-center">

          <FaUserCircle
            size={120}
            className="text-primary"
          />

          <h2 className="mt-3">
            {profile.name}
          </h2>

          <p className="text-secondary">
            <FaEnvelope /> {profile.email}
          </p>

        </div>

        <hr />

        <div className="row mt-4">

          <div className="col-md-6">

            <div className="card shadow-sm p-4 text-center">

              <FaLaptopCode
                size={45}
                className="text-success mx-auto"
              />

              <h5 className="mt-3">
                DSA Solved
              </h5>

              <h2>
                {profile.solvedQuestions}
              </h2>

            </div>

          </div>

          <div className="col-md-6">

            <div className="card shadow-sm p-4 text-center">

              <FaBookOpen
                size={45}
                className="text-warning mx-auto"
              />

              <h5 className="mt-3">
                Best Quiz Score
              </h5>

              <h2>
                {profile.bestScore}/5
              </h2>

            </div>

          </div>

        </div>

        {/* Achievement Badges */}

        <Badges solved={solved} />

        <div className="text-center mt-5">

          <button
            className="btn btn-primary"
            onClick={() => navigate("/edit-profile")}
          >
            <FaEdit className="me-2" />
            Edit Profile
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;