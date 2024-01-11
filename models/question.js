const { DataTypes } = require('sequelize');

const Question = (sequelize) => sequelize.define('questions', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    question: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
});

module.exports = Question;