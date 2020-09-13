const express = require("express");
const router = express.Router();
const TestController = require("../controllers/Test");

router
  .route("/top-5-cheaps")
  .get(TestController.aliasTopTests, TestController.getAllTest);

router
  .route("/")
  .get(TestController.getAllTest)
  .post(TestController.createTest);

router
  .route("/:id")
  .get(TestController.getTest)
  .patch(TestController.updateTest)
  .delete(TestController.deleteTest);

module.exports = router;
