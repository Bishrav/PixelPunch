import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";
import "./CarList.css";

import { useState } from "react";
import Sidebar, { SidebarOffcanvas } from "./Components/Sidebar.jsx";

function CarList() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [cars, setCars] = useState([
    { name: "Range Rover", type: "SUV", price: "$95,000" },
    { name: "Porsche 911", type: "Sports", price: "$120,000" },
    {  name: "Lamborghini Aventador", type: "Supercar", price: "$450,000" },
    { name: "G-Wagon", type: "SUV", price: "$140,000" },
    { name: "Tesla Model S", type: "Electric", price: "$90,000" },
    { name: "BMW M5", type: "Sedan", price: "$105,000" },
  ]);

  const [newCar, setNewCar] = useState({ name: "", type: "", price: "" });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCar = (e) => {
    e.preventDefault();
    setCars([...cars, newCar]);
    setNewCar({ name: "", type: "", price: "" });
    setIsAdding(false);
  };

  const handleDeleteCar = (index) => {
    setCars(cars.filter((_, i) => i !== index));
  };

  return (
    <div className="page-container">
      <Sidebar />

      <div className="main-content">
        <nav className="page-nav">
          <div className="nav-left">
            <button
              className="nav-btn"
              onClick={() => navigate("/")}
            >
              ← Home
            </button>
            <SidebarOffcanvas />
          </div>

          <h1 className="nav-title">Car List</h1>

          {isAuthenticated && (
            <button
              className="nav-btn"
              onClick={() => navigate("/Dashboard")}
            >
              Dashboard
            </button>
          )}
        </nav>

        <div className="page-content">
          <div className="page-header">
            <div>
              <p>Explore and manage our premium collection of vehicles</p>
            </div>

            <button
              onClick={() => setIsAdding(!isAdding)}
              className="add-btn"
            >
              {isAdding ? "Cancel" : "Add New Car"}
            </button>
          </div>

          {isAdding && (
            <form onSubmit={handleAddCar} className="add-form">
              <div>
                <label>Car Name</label>
                <input
                  required
                  placeholder="eg: Ford Mustang"
                  value={newCar.name}
                  onChange={e => setNewCar({ ...newCar, name: e.target.value })}
                />
              </div>

              <div>
                <label>Type</label>
                <input
                  required
                  placeholder="eg: SUV, Sports, Sedan"
                  value={newCar.type}
                  onChange={e => setNewCar({ ...newCar, type: e.target.value })}
                />
              </div>

              <div>
                <label>Price</label>
                <input
                  required
                  placeholder="$120,000"
                  value={newCar.price}
                  onChange={e => setNewCar({ ...newCar, price: e.target.value })}
                />
              </div>

              <button type="submit" className="save-btn">Save Car</button>
            </form>
          )}

          <div className="car-grid">
            {cars.map((car, index) => (
              <div key={index} className="car-card">
                <h3>{car.name}</h3>
                <p className="car-type">{car.type}</p>
                <p className="car-price">{car.price}</p>

                <div className="car-card-buttons">
                  <button className="view-btn">Details</button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteCar(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarList;
