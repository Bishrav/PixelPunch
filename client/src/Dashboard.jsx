import { useAuth } from "./hooks/useAuth.js";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

import lamborghini from "./assets/lamborghini.png";
import MahindraThar from "./assets/MahindraThar.jpg";
import porsche from "./assets/porsche.png";

/* ===== Chart.js imports ===== */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

/* ===== Register chart components ===== */
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/Login");
  };

  /* ===== Chart Data ===== */
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Cars Sold",
        data: [12, 18, 15, 22, 19, 27],
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      x: {
        ticks: { color: "#9ca3af" },
        grid: { display: false },
      },
    },
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

      {/* Main Layout */}
      <div className="dashboard-main">

        {/* Sales Overview */}
        <div className="main-graph">
          <h3>Sales Overview</h3>
          <p className="graph-subtitle">
            Monthly car sales performance
          </p>

          <div className="overview-stats">
            <div>
              <span>Total Sales</span>
              <strong>Rs. 45,00,000</strong>
            </div>
            <div>
              <span>Best Month</span>
              <strong>June</strong>
            </div>
            <div>
              <span>Growth</span>
              <strong>+18%</strong>
            </div>
          </div>

          <div className="chart-container">
            <Bar data={salesData} options={chartOptions} />
          </div>
        </div>

        {/* Top Cars */}
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
