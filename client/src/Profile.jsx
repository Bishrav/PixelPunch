import React, { useEffect, useState } from "react";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // get token
    fetch("http://localhost:5000/api/auth/profile", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setListings(data.listings || []);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!user) return <p>Loading...</p>; // show while fetching

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.avatar || "/default-avatar.png"} alt={user.name} className="profile-avatar" />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.location}</p>
        </div>
      </div>

      <div className="account-overview">
        <div className="overview-card">
          <span>Cars Bought</span>
          <strong>{user.carsBought}</strong>
        </div>
        <div className="overview-card">
          <span>Cars Rented</span>
          <strong>{user.carsRented}</strong>
        </div>
        <div className="overview-card">
          <span>Active Rentals</span>
          <strong>{user.activeRentals}</strong>
        </div>
        <div className="overview-card">
          <span>Saved Cars</span>
          <strong>{user.savedCars}</strong>
        </div>
      </div>

      <div className="my-listings">
        {listings.map((car) => (
          <div key={car.id} className="listing-card">
            <img src={car.image} alt={car.name} />
            <div className="listing-info">
              <p className="car-name">{car.name}</p>
              <p className="car-price">NPR {car.price}</p>
              <span className={`status-badge ${car.status === "Sold" ? "sold" : "active"}`}>
                {car.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
