const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

//get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      // find all products
      //associated Category and Tag data
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Products not found" });
  }
});

//get one product
router.get("/:id", async (req, res) => {
  //find a single product by its `id`
  try {
    const product = await Product.findByPk(req.params.id, {
      // associated Category and Tag data
      include: [{ model: Category }, { model: Tag }],
    });
    if (!product) {
      res.status(404).json({ message: "No product found with that id" }),
        res.status(200).json(product);
      return;
    }
  } catch (err) {
    res.status(500).json({ message: "Product not found" });
  }
});

// create new product
router.post("/", (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      // if (req.body.tagIds.length) {
      //   const productTagIds = req.body.tagIds.map((tag_id) => {
      //     return {
      //       product_id: product.id,
      //       tag_id,
      //     };
      //   });
      //   return ProductTag.bulkCreate(productTagIds);
      // }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      res.status(400).json({ message: "creation failed", error: err });
    });
});

// update product

// Product.create(req.body)
//   .then((product) => {
//     // if there's product tags, we need to create pairings to bulk create in the ProductTag model
//     if (req.body.tagIds.length) {
//       const productTagIdArr = req.body.tagIds.map((tag_id) => {
//         return {
//           product_id: product.id,
//           tag_id,
//         };
//       });
//       return ProductTag.bulkCreate(productTagIdArr);
//     }
//     // if no product tags, just respond
//     res.status(200).json(product);
//   })
//   .then((productTagIds) => res.status(200).json(productTagIds))
//   .catch((err) => {
//     console.log(err);
//     res.status(400).json(err);
//   });

// update product
router.put("/:id", async (req, res) => {
  try {
    // update product data
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (req.body.tagIds && req.body.tagIds.length > 0) {
      //get product tags and their ids
      const productTags = await productTag.findAll({
        where: { product_id: req.params.id },
      });
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids

      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tags.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }
    //return updated product
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Tag }],
    });
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//delete one product by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      //if product not found send error

      return res.status(404).json({ message: "No product found with that id" });
    }

    res.status(200).json({ message: `Product ${req.params.id} deleted` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
