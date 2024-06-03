// models/User.js
const { DataTypes } = require('sequelize');

const User = (sequelize) => sequelize.define('users', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING(20),
    allowNull: false, 
  },
  lastName: {
    type: DataTypes.STRING(20),
    allowNull: false, 
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  company: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING(255),
  },
  goodStateCount: {
    type: DataTypes.INTEGER,
  },
  payday: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}
);

module.exports = User;