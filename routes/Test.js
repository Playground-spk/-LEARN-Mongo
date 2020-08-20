const express = require("express");
const router = express.Router();
const TestController = require("../controllers/Test");

router.get("/");

router.post("/", TestController.createTest);

module.exports = router;
