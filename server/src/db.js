import { Sequelize } from "sequelize";


export const sequelize = new Sequelize("pixelpunch_db", "postgres", "Admin12", {
  host: "localhost",
  dialect: "postgres",
});