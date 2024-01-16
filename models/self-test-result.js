const { DataTypes } = require('sequelize');

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
    st_answer1: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    st_answer2: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    st_answer3: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    st_answer4: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
})

module.exports = SelfTestResults;