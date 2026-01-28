import { useAuth } from "./hooks/useAuth.js";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

import lamborghini from "./assets/lamborghini.png";
import MahindraThar from "./assets/MahindraThar.jpg";
import porsche from "./assets/Porsche.png";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/Login");
  };

  return (
    <div className="dashboard-container">

      {/* Header */}
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="dashboard-actions">
          <button onClick={() => navigate("/Profile")} className="action-btn">
            View Profile
          </button>
          <button onClick={() => navigate("/Home")} className="action-btn">
            Home
          </button>
          <button onClick={handleLogout} className="action-btn logout-btn">
            Logout
          </button>
        </div>
      </header>

      {/* Welcome */}
      <section className="welcome-section">
        <h2>Welcome Back, {user?.username || "Guest"}</h2>
        <p>Here’s an overview of your car dealership performance.</p>
      </section>

      {/* Stats */}
      <section className="stats-cards">
        <div className="stat-card">
          <h3>1,245</h3>
          <span>+14% this week</span>
        </div>
        <div className="stat-card">
          <h3>320</h3>
          <span>24 days</span>
        </div>
        <div className="stat-card">
          <h3>Rs. 12,00,056</h3>
          <span>+8% this month</span>
        </div>
        <div className="stat-card">
          <h3>148</h3>
          <span>Cars for Sale</span>
        </div>
      </section>

      {/* Main Section */}
      <div className="dashboard-main">

        {/* SALES OVERVIEW (EMPTY BOX FIXED) */}
        <div className="main-graph">
          <h3>Sales Overview</h3>
          <p className="graph-subtitle">
            Monthly car sales and revenue summary
          </p>

          <div className="overview-stats">
            <div>
              <span>Total Sales</span>
              <strong>Rs. 45,00,000</strong>
            </div>
            <div>
              <span>Best Month</span>
              <strong>December</strong>
            </div>
            <div>
              <span>Growth</span>
              <strong>+18%</strong>
            </div>
          </div>

          <div className="graph-placeholder">
            Chart / analytics will appear here
          </div>
        </div>

        {/* Top Selling Cars */}
        <div className="top-cars-panel">
          <div className="panel-header">
            <h3>Top Selling Cars</h3>
            <button className="view-all-btn">View All</button>
          </div>

          <div className="top-car">
            <img src={lamborghini} alt="Lamborghini" />
            <div>
              <p>Lamborghini</p>
              <span>Rs. 12,00,000</span>
            </div>
          </div>

          <div className="top-car">
            <img src={MahindraThar} alt="Mahindra Thar" />
            <div>
              <p>Mahindra Thar</p>
              <span>Rs. 15,00,000</span>
            </div>
          </div>

          <div className="top-car">
            <img src={porsche} alt="Porsche 911" />
            <div>
              <p>Porsche 911</p>
              <span>Rs. 17,00,000</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Cards */}
      <section className="bottom-cards">
        <div className="bottom-card">Recent Orders</div>
        <div className="bottom-card">Customer Feedback</div>
        <div className="bottom-card">Upcoming Test Drives</div>
      </section>

    </div>
  );
}

export default Dashboard;
