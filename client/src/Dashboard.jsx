import React, { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar.jsx";
import axios from "axios";
import "./Dashboard.css";

/* ===== Chart.js imports ===== */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({ carsListed: 0, carsSold: 0, carsBought: 0, revenue: 0 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [myListings, setMyListings] = useState([]);

  // Modals state
  const [showAddCar, setShowAddCar] = useState(false);
  const [showOffer, setShowOffer] = useState(false);

  // Forms state
  const [newCar, setNewCar] = useState({ name: "", brand: "", price: "", type: "", img: "" });
  const [newOffer, setNewOffer] = useState({ title: "", type: "", discount: "", car: "", img: "", expires: "" });

  // Fetch Data
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/dashboard/stats", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data.stats);
      setRecentActivity(res.data.recentActivity);
      setMyListings(res.data.myListings);
    } catch (err) {
      console.error("Error fetching dashboard data", err);
    }
  };

  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user]);

  // Handlers
  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/cars", newCar, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowAddCar(false);
      setNewCar({ name: "", brand: "", price: "", type: "", img: "" });
      fetchDashboardData(); // Refresh stats
      alert("Car added to Shop successfully!");
    } catch (err) {
      alert("Error adding car: " + err.message);
    }
  };

  const handleCreateOffer = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/offers", newOffer, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowOffer(false);
      setNewOffer({ title: "", type: "", discount: "", car: "", img: "", expires: "" });
      fetchDashboardData();
      alert("Offer created successfully!");
    } catch (err) {
      alert("Error creating offer: " + err.message);
    }
  };

  const handleDeleteCar = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDashboardData();
    } catch (err) {
      alert("Error deleting car");
    }
  };

  /* ===== Chart Configuration ===== */
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales (in Lakhs)",
        data: [15, 22, 18, 30, 25, 40],
        backgroundColor: "rgba(255, 138, 0, 0.8)",
        borderColor: "#ff8a00",
        borderWidth: 1,
        hoverBackgroundColor: "#fff",
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: "rgba(255,255,255,0.05)", drawBorder: false }, ticks: { color: "#aaa" } },
      x: { grid: { display: false }, ticks: { color: "#aaa" } },
    },
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dash-bg-glow"></div>

      <div className="dashboard-content">

        {/* HEADER */}
        <header className="dash-header">
          <div>
            <h1 className="dash-title">Command Center</h1>
            <p className="dash-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="user-profile-corner" onClick={() => navigate("/Profile")}>
            <div className="user-avatar-placeholder">{user?.username?.[0]?.toUpperCase() || "U"}</div>
            <div className="user-info-text">
              <h3>{user?.username || "Guest User"}</h3>
              <span>User</span>
            </div>
          </div>
        </header>

        {/* WELCOME BANNER */}
        <div className="welcome-banner">
          <h2>Welcome back, <span className="highlight-text">{user?.username || "Driver"}</span>.</h2>
          <p>Your dealership performance overview.</p>
        </div>

        {/* STATS GRID */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🚗</div>
            <div className="stat-details">
              <h3>{stats.carsListed}</h3>
              <p>Cars Listed</p>
            </div>
            <div className="stat-glow"></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🤝</div>
            <div className="stat-details">
              <h3>{stats.carsSold}</h3>
              <p>Cars Sold</p>
            </div>
            <div className="stat-glow"></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📥</div>
            <div className="stat-details">
              <h3>{stats.carsBought}</h3>
              <p>Cars Bought</p>
            </div>
            <div className="stat-glow"></div>
          </div>
          <div className="stat-card revenue-card">
            <div className="stat-icon">💰</div>
            <div className="stat-details">
              <h3>Rs. {stats.revenue.toLocaleString()}</h3>
              <p>Total Revenue</p>
            </div>
            <div className="stat-glow"></div>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="dash-lower-section">

          {/* LEFT: Chart & My Listings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', flex: 2 }}>

            {/* SALES CHART */}
            <div className="chart-panel">
              <div className="panel-header">
                <h3>Sales Overview</h3>
              </div>
              <div className="chart-wrapper">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>

            {/* MY LISTINGS */}
            <div className="chart-panel" style={{ minHeight: 'auto' }}>
              <div className="panel-header">
                <h3>My Listings</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                {myListings.map(car => (
                  <div key={car.id} style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '10px', border: '1px solid #333' }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem' }}>{car.name}</h4>
                    <p style={{ color: '#888', fontSize: '0.8rem' }}>Rs. {car.price}</p>
                    <button onClick={() => handleDeleteCar(car.id)} style={{ marginTop: '10px', background: 'red', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.8rem' }}>Delete</button>
                  </div>
                ))}
                {myListings.length === 0 && <p style={{ color: '#666' }}>No cars listed yet.</p>}
              </div>
            </div>

          </div>

          {/* RIGHT: Quick Actions & Activity */}
          <div className="activity-panel">
            <h3>Quick Actions</h3>
            <div className="quick-actions-grid">
              <button className="q-btn" onClick={() => setShowAddCar(true)}>
                <span>➕</span> Add New Car
              </button>
              <button className="q-btn" onClick={() => setShowOffer(true)}>
                <span>🏷️</span> Create Offer
              </button>
              <button className="q-btn" onClick={() => navigate("/shop")}>
                <span>🛒</span> Shop
              </button>
              <button className="q-btn logout" onClick={logout}>
                <span>🚪</span> Logout
              </button>
            </div>

            <h3 style={{ marginTop: '30px' }}>Recent Activity</h3>
            <ul className="activity-list">
              {recentActivity.map((act, i) => (
                <li key={i}>
                  <span className="dot dot-orange"></span>
                  <p><strong>{act.action}</strong>: {act.details}</p>
                  <span className="time">{new Date(act.createdAt).toLocaleDateString()}</span>
                </li>
              ))}
              {recentActivity.length === 0 && <li style={{ color: '#666' }}>No recent activity</li>}
            </ul>
          </div>
        </div>

      </div>

      {/* ADD CAR MODAL */}
      {showAddCar && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="modal-content" style={{ background: '#222', padding: '40px', borderRadius: '15px', width: '500px', border: '1px solid #444' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>List Your Vehicle</h2>
            <form onSubmit={handleAddCar} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input required placeholder="Car Name" value={newCar.name} onChange={e => setNewCar({ ...newCar, name: e.target.value })} style={{ padding: '15px', background: '#333', border: 'none', color: 'white' }} />
              <input required placeholder="Brand" value={newCar.brand} onChange={e => setNewCar({ ...newCar, brand: e.target.value })} style={{ padding: '15px', background: '#333', border: 'none', color: 'white' }} />
              <input required type="number" placeholder="Price" value={newCar.price} onChange={e => setNewCar({ ...newCar, price: e.target.value })} style={{ padding: '15px', background: '#333', border: 'none', color: 'white' }} />
              <input required placeholder="Type (e.g. SUV)" value={newCar.type} onChange={e => setNewCar({ ...newCar, type: e.target.value })} style={{ padding: '15px', background: '#333', border: 'none', color: 'white' }} />
              <input placeholder="Image URL (optional)" value={newCar.img} onChange={e => setNewCar({ ...newCar, img: e.target.value })} style={{ padding: '15px', background: '#333', border: 'none', color: 'white' }} />
              {newCar.img && (
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                  <img src={newCar.img} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '10px', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowAddCar(false)} style={{ flex: 1, padding: '15px', background: '#444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '15px', background: '#ff8a00', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Add Car</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE OFFER MODAL */}
      {showOffer && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="modal-content" style={{ background: '#222', padding: '40px', borderRadius: '15px', width: '500px', border: '1px solid #444' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Special Offer</h2>
            <form onSubmit={handleCreateOffer} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input required placeholder="Offer Title (e.g. Summer Sale)" value={newOffer.title} onChange={e => setNewOffer({ ...newOffer, title: e.target.value })} style={{ padding: '15px', background: '#333', border: 'none', color: 'white' }} />
              <input required placeholder="Type (e.g. Seasonal)" value={newOffer.type} onChange={e => setNewOffer({ ...newOffer, type: e.target.value })} style={{ padding: '15px', background: '#333', border: 'none', color: 'white' }} />
              <input required placeholder="Discount (e.g. 25% OFF)" value={newOffer.discount} onChange={e => setNewOffer({ ...newOffer, discount: e.target.value })} style={{ padding: '15px', background: '#333', border: 'none', color: 'white' }} />
              <input required placeholder="Applicable Car" value={newOffer.car} onChange={e => setNewOffer({ ...newOffer, car: e.target.value })} style={{ padding: '15px', background: '#333', border: 'none', color: 'white' }} />
              <input required placeholder="Expires (e.g. 2 Days)" value={newOffer.expires} onChange={e => setNewOffer({ ...newOffer, expires: e.target.value })} style={{ padding: '15px', background: '#333', border: 'none', color: 'white' }} />
              <input placeholder="Image URL (optional)" value={newOffer.img} onChange={e => setNewOffer({ ...newOffer, img: e.target.value })} style={{ padding: '15px', background: '#333', border: 'none', color: 'white' }} />
              {newOffer.img && (
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                  <img src={newOffer.img} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '10px', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowOffer(false)} style={{ flex: 1, padding: '15px', background: '#444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '15px', background: '#ff8a00', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Create Offer</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;