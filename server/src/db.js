import { Sequelize } from "sequelize";


export const sequelize = new Sequelize("pixelpunch_db", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});