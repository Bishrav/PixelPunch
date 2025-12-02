// models/User.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js"; // your DB connection

export const User = sequelize.define("User", {
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
}, {
  timestamps: true, // adds createdAt and updatedAt automatically
});
