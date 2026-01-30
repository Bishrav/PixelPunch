import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Car = sequelize.define("Car", {
    name: { type: DataTypes.STRING, allowNull: false },
    brand: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.TEXT, defaultValue: '' },
    ownerId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'Available' }
});
