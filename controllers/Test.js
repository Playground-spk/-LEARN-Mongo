const testModel = require("../model/Test");
const { db } = require("../model/Test");
const { json } = require("express");
const TestModel = require("../model/Test");
const APIFeatures = require("../utils/apiFeatures");

const aliasTopTests = (req, res, next) => {
  (req.query.limit = "5"), (req.query.sort = "-ratingsAverage,price");
  next();
};

const getAllTest = async (req, res) => {
  try {
    /* execute query */
    const apiFeature = new APIFeatures(testModel.find(), req.query)
      .sort()
      .field()
      .filter()
      .paginate();
    const tests = await apiFeature.query;

    // const test = await testModel
    //   .find()
    //   .where("duration")
    //   .equals(5)
    //   .where("difficulty")
    //   .equals("easy");

    res.status(200).json({
      status: "success",
      result: tests.length,
      data: {
        tests,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: error,
    });
  }
};

const getTest = async (req, res) => {
  try {
    const tour = await testModel.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

const createTest = async (req, res) => {
  const test = new testModel(req.body);
  try {
    const complete = await test.save();
    res.status(201).send(complete);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateTest = async (req, res) => {
  try {
    const tour = await testModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

const deleteTest = async (req, res) => {
  try {
    await testModel.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

const getTestStats = async (req, res) => {
  try {
    const stats = await TestModel.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: "$difficulty" },
          numTests: { $sum: 1 },
          numRatings: { $sum: "$ratingsQuantity" },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      {
        $match: { _id: { $ne: "EASY" } },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: stats,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

module.exports = {
  createTest,
  getAllTest,
  getTest,
  updateTest,
  deleteTest,
  aliasTopTests,
  getTestStats,
};
