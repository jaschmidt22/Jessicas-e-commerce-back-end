const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      // find all categories include associated products
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Categories not found" });
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value, include associated products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!category) {
      res.status(404).json({ message: "No category found with that id" }),
        res.status(200).json(category);
    }
  } catch (err) {
    res.status(500).json({ message: "Category not found" });
  }
});

router.post("/", async (req, res) => {
  // create a new category using data from req.body
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ message: "Creation failed" });
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` using the data from req.body
  try {
    const category = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy({ where: { id: req.params.id } });
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ message: "Deletion failed" });
  }
});

//export router
module.exports = router;
