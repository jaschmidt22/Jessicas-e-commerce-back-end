const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER, // define data type
      allowNull: false, // does not allow null values
      primaryKey: true, // set as primary key
      autoIncrement: true, // uses auto increment
    },
    tag_id: {
      type: DataTypes.INTEGER, //define data type
      references: {
        model: "tag", //reference "tag" table
        key: "id", //reference 'id' from "tag" tavle
      },
    },
    product_id: {
      type: DataTypes.INTEGER, // define data type
      references: {
        model: "product", // reference "product" table
        key: "id", // reference 'id' from "product" table
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;
