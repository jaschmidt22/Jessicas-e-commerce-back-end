const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Category extends Model {}

Category.init(
  {
    // define the 'id' column
    id: {
      type: DataTypes.INTEGER, // Integer data type
      allowNull: false, // Doesn't allow null values
      primaryKey: true, // Set as primary key
      autoIncrement: true, // Uses auto increment
    },

    // define the 'category_name' column

    category_name: {
      type: DataTypes.STRING, // String data type
      allowNull: false, //Doesn't allow null values
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "category",
  }
);
// export the Category model
module.exports = Category;
