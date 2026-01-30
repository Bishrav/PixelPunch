import React, { useEffect, useState } from "react";
import API from "./services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ carsListed: 0, carsSold: 0, carsBought: 0, revenue: 0 });
  const [myListings, setMyListings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    title: "",
    username: "",
    profileImage: ""
  });

  useEffect(() => {
    fetchProfile();
    fetchStats();
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

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:5000/api/dashboard/stats", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(data.stats);
      setMyListings(data.myListings);
    } catch (err) {
      console.error("Error fetching stats:", err);
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

  if (!user) return <div className="loading-screen">INITIALIZING PROFILE...</div>;

  return (
    <div className="profile-wrapper">
      <Sidebar />
      <div className="profile-bg-glow"></div>

      <div className="profile-content">
        {/* HEADER / NAV */}
        <nav className="profile-nav">
          <h2 onClick={() => navigate("/")} className="brand-logo">PIXEL PUNCH</h2>
          <button onClick={() => navigate("/dashboard")} className="back-btn">Back to Dashboard</button>
        </nav>

        <div className="profile-grid">
          {/* LEFT COLUMN: User Card */}
          <div className="user-card-section">
            <div className="user-card-glass">
              <div className="avatar-container">
                <img
                  src={user.profileImage || "https://robohash.org/" + user.username + "?set=set4"}
                  alt={user.username}
                  className="profile-avatar-lg"
                />
                <div className="status-indicator online"></div>
              </div>

              <h1 className="profile-username">{user.username}</h1>
              <p className="profile-title">{user.title || "Elite Driver"}</p>

              <div className="profile-bio">
                <p>"{user.bio || "No bio set. Just driving."}"</p>
              </div>

              <div className="profile-meta">
                <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
                <span>Email: {user.email}</span>
              </div>

              <button onClick={() => setIsEditing(true)} className="edit-profile-btn">
                EDIT PROFILE
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Stats & Listings */}
          <div className="stats-section">

            {/* Stats Row */}
            <div className="mini-stats-row">
              <div className="mini-stat">
                <h3>{stats.carsListed}</h3>
                <label>Garage Size</label>
              </div>
              <div className="mini-stat">
                <h3>{stats.carsSold}</h3>
                <label>Sales</label>
              </div>
              <div className="mini-stat">
                <h3>Rs. {(stats.revenue / 100000).toFixed(1)}L</h3>
                <label>Revenue</label>
              </div>
            </div>

            {/* My Listings */}
            <div className="listings-container">
              <h3>Current Garage</h3>
              <div className="listings-scroll">
                {myListings.length > 0 ? myListings.map(car => (
                  <div key={car.id} className="listing-item">
                    <div className="listing-img">
                      {car.img ? <img src={car.img} alt={car.name} /> : <span>🚗</span>}
                    </div>
                    <div className="listing-info">
                      <h4>{car.name}</h4>
                      <span>{car.brand} • {car.type}</span>
                    </div>
                    <div className="listing-price">
                      Rs. {car.price.toLocaleString()}
                    </div>
                  </div>
                )) : (
                  <div className="no-listings">
                    <p>No cars currently listed.</p>
                    <button onClick={() => navigate("/dashboard")}>Add a Car</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal-content glass-modal">
            <h2>Update Transponder</h2>
            <form onSubmit={handleSubmit} className="futuristic-form">
              <div className="form-group">
                <label>Codename (Username)</label>
                <input name="username" value={formData.username} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Designation (Title)</label>
                <input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Street Racer" />
              </div>
              <div className="form-group">
                <label>Bio Data</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" />
              </div>
              <div className="form-group">
                <label>Avatar URL</label>
                <input name="profileImage" value={formData.profileImage} onChange={handleChange} placeholder="https://..." />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setIsEditing(false)} className="cancel-btn">CANCEL</button>
                <button type="submit" className="save-btn">SAVE CHANGES</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}