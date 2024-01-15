const { DataTypes } = require('sequelize');

// Sequelize 모델을 정의하고, 해당 모델과 연결된 데이터베이스 테이블을 생성
const Company = (sequelize) => sequelize.define('companies', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    image: {
        type: DataTypes.STRING(500),
    }
});

module.exports = Company;