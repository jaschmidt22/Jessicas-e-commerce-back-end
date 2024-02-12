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
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: "Tag not found" });
  }
});

// create a new tag
router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json({ message: "Creation failed" });
  }
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    !updatedTag[0]
      ? res.status(404).json({ message: "id not found" })
      : res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({ where: { id: req.params.id } });
    !deletedTag
      ? res.status(404).json({ message: "id not found" })
      : res.status(200).json(deletedTag);
  } catch (err) {
    res.status(400).json({ message: "Delete failed" });
  }
});

// export router
module.exports = router;
