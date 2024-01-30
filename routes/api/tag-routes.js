const router = require("express").Router();
const { Tag, Product } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      // find all tags include associated product data
      include: [{ model: Product }],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ message: "Tags not found" });
  }
});

// find a single tag by its `id`include its associated product data
router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tag) {
      res.status(404).json({ message: "No tag found with that id" });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ message: "Tag not found" });
  }
});

// create a new tag
router.post("/", async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json({ message: "Creation failed" });
  }
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const tag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const tag = await Tag.destroy({ where: { id: req.params.id } });
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json({ message: "Delete failed" });
  }
});

// export router
module.exports = router;
