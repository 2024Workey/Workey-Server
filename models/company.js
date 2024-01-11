const { DataTypes } = require('sequelize');

const Company = (sequelize) => sequelize.define('companies', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING(500),
    }
});

module.exports = Company;