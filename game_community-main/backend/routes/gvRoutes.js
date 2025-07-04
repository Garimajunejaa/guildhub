const express = require("express");
const gvController = require("../controllers/gvController");

const router = express.Router();

router.get("/:id", gvController.getGVById);

module.exports = router;
