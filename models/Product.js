// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER, // define data type
      allowNull: false, // does not allow null values
      primaryKey: true, // set as primary key
      autoIncrement: true, // automatically increase value
    },
    product_name: {
      type: DataTypes.STRING, // define data type
      allowNull: false, // does not allow null values
    },
    price: {
      type: DataTypes.DECIMAL, // define data type
      allowNull: false, // does not allow null values
      validate: {
        isDecimal: true, // checks for decimal
      },
    },
    stock: {
      type: DataTypes.INTEGER, // define data type
      allowNull: false, // does not allow null values
      defaultValue: 10, // set default value
      validate: {
        isNumeric: true, // checks for numbers
      },
    },
    category_id: {
      type: DataTypes.INTEGER, // define data type
      references: {
        model: "category", // what model it is coming from ('category')
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  }
);

module.exports = Product;
