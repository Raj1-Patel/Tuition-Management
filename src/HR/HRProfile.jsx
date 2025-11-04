import React, { useState } from "react";
import "./Hrprofile.css";
import { getSession, getUser, updateHR } from "../utils/localStorageUtils";

export default function HRProfile() {
  const session = getSession();
  const hrData = getUser(session.id, "hr");
  const [form, setForm] = useState({ ...hrData });
  const [image, setImage] = useState(hrData.image || null);

  const handleUpdate = () => {
    updateHR({ ...form, image });
    alert("Profile updated successfully!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-container">
            <img
              src={
                image ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="avatar"
            />
            <label htmlFor="file-upload" className="upload-btn">
              📷
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <h2>{form.name || "HR Profile"}</h2>
          <p>Manage your account info</p>
        </div>

        <div className="profile-form">
          <div className="form-group">
            <label>ID</label>
            <input value={form.id} disabled />
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter new password"
            />
          </div>

          <button onClick={handleUpdate} className="save-btn">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
