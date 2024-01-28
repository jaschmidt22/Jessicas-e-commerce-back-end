const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER, // define type
      allowNull: false, // does not allow null values
      primaryKey: true, // set as primary key
      autoIncrement: true, // uses auto increment
    },
    product_id: {
      type: DataTypes.INTEGER, // define type
      references: {
        model: "product", // what model is coming from
        key: "id", // what key it is coming from
      },
    },
    tag_id: {
      type: DataTypes.INTEGER, //define type
      references: {
        model: "tag", //what model is coming from
        key: "id", //what key its coming from
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

// - `ProductTag`

//   - `id`

//     - Integer.

//     - Doesn't allow null values.

//     - Set as primary key.

//     - Uses auto increment.

//   - `product_id`

//     - Integer.

//     - References the `Product` model's `id`.

//   - `tag_id`

//     - Integer.

//     - References the `Tag` model's `id`.
