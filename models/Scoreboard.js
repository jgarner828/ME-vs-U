const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Scoreboard extends Model {}

Scoreboard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },
    isAccepted:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
    isDeclined:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    competition_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "competition",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "scoreboard",
  }
);

module.exports = Scoreboard;
