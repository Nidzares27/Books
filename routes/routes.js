const path = require("path");

const express = require("express");

const libaryController = require("../controllers/libary");

const router = express.Router();

router.get("/", libaryController.getIndex);

router.get("/add-book", libaryController.getAddBook);

router.post("/add-book", libaryController.postAddBook);

// router.get("/edit-book", libaryController.getEditBook);

router.post("/edit-book", libaryController.postEditBook);

router.post("/", libaryController.postDeleteBook);

router.use("/", libaryController.getEditBook);

module.exports = router;
