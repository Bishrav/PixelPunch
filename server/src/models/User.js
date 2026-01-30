// models/User.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js"; // your DB connection

export const User = sequelize.define("User", {
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  bio: { type: DataTypes.TEXT, allowNull: true },
  profileImage: { type: DataTypes.STRING, allowNull: true },
  role: { type: DataTypes.STRING, defaultValue: "user" },
  title: { type: DataTypes.STRING, allowNull: true },
}, {
  timestamps: true, // adds createdAt and updatedAt automatically
});
