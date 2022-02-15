const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Competition extends Model {
  //function for determining the end date of the competition. Then multiplying it to get milliseconds
  isComplete() {
    return (
      new Date().getTime() >
      new Date(this.created_at).getTime() + this.duration * 60 * 60 * 1000
    );
  }
}

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
    winner: {
      type: DataTypes.INTEGER,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true,
    },
    owner: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "competition",
  }
);

module.exports = Competition;
