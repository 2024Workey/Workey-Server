const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const SelfTestResults = (sequelize) => sequelize.define("self_test_results", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    diaryId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {// fk
            model: 'diaries',
            key: 'id',
        }
    },
    answer1: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    answer2: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    answer3: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    answer4: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
})

module.exports = SelfTestResults;