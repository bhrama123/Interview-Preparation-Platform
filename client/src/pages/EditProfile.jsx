import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function EditProfile() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {

    const res = await api.get(`/users/${user.id}`);

    setForm({
      name: res.data.name,
      email: res.data.email,
    });

  };

  const updateProfile = async (e) => {

    e.preventDefault();

    const res = await api.put(
      `/users/${user.id}`,
      form
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    alert("Profile Updated");

    navigate("/profile");

  };

  return (

    <div className="container py-5">

      <div className="card shadow p-5">

        <h2>Edit Profile</h2>

        <form onSubmit={updateProfile}>

          <input
            className="form-control mb-3"
            value={form.name}
            onChange={(e)=>
              setForm({
                ...form,
                name:e.target.value
              })
            }
          />

          <input
            className="form-control mb-3"
            value={form.email}
            onChange={(e)=>
              setForm({
                ...form,
                email:e.target.value
              })
            }
          />

          <button className="btn btn-success">
            Update
          </button>

        </form>

      </div>

    </div>

  );

}

export default EditProfile;