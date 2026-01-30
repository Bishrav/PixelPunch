import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Offer = sequelize.define("Offer", {
    title: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    discount: { type: DataTypes.STRING, allowNull: false },
    car: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.TEXT, defaultValue: '' },
    expires: { type: DataTypes.STRING, allowNull: false },
    ownerId: { type: DataTypes.INTEGER, allowNull: false }
});
