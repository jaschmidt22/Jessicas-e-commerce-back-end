// Require the express router
const router = require("express").Router();
// Require the category-routes.js, product-routes.js, and tag-routes.js files
const categoryRoutes = require("./category-routes");
const productRoutes = require("./product-routes");
const tagRoutes = require("./tag-routes");

//Use categoryRoutes, productRoutes, and tagRoutes for their endpoints
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/tags", tagRoutes);

module.exports = router;
