const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Diary = (sequelize) => sequelize.define("diaries", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {// fk
            model: 'users',
            key: 'id',
        }
    },
    quesId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'questions',
            key: "id",
        }
    },
    answer: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    star: {
        type: DataTypes.TINYINT,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNUll: false,
    },
    state: {
        type: DataTypes.TINYINT,
        allowNUll: false,
    },
    companyId: {
        type: DataTypes.BIGINT,
        allowNUll: false,
        references: {
            model: "companies",
            key: "id",
        }
    }
})

module.exports = Diary;