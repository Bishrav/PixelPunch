import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Activity = sequelize.define("Activity", {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    action: { type: DataTypes.STRING, allowNull: false },
    details: { type: DataTypes.STRING, allowNull: false }
});
