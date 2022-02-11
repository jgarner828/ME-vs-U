const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Competition extends Model {}

Competition.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    description: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 24,
      },
    reward: {
        type: DataTypes.STRING,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      uom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      winner:{
        type: DataTypes.INTEGER,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true,
      },
      isComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
      owner: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'competition',
  }
);

module.exports = Competition;