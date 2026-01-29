import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || "pixelpunch_db",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "Admin12",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
  }
);