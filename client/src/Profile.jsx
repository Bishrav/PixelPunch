import React, { useEffect, useState } from "react";
import API from "./services/api";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    title: "",
    username: "",
    profileImage: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/profile");
      setUser(data);
      setFormData({
        bio: data.bio || "",
        title: data.title || "",
        username: data.username || "",
        profileImage: data.profileImage || ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put("/profile", formData);
      setUser(data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  if (!user) return <div className="profile-container">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={user.profileImage || "https://via.placeholder.com/150"}
          alt={user.username}
          className="profile-avatar"
        />
        <div className="profile-info">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="edit-form">
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="edit-input"
              />
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title (e.g. Software Engineer)"
                className="edit-input"
              />
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                className="edit-textarea"
              />
              <input
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                placeholder="Profile Image URL"
                className="edit-input"
              />
              <div className="form-actions">
                <button type="submit" className="btn save">Save</button>
                <button type="button" onClick={() => setIsEditing(false)} className="btn cancel">Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <h2>{user.username}</h2>
              <p className="user-title">{user.title || "No Title Set"}</p>
              <p className="user-bio">{user.bio || "No bio yet."}</p>
              <p className="user-email">{user.email}</p>
              <button onClick={() => setIsEditing(true)} className="btn edit">Edit Profile</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
