const testModel = require("../model/Test");
const { db } = require("../model/Test");
const { json } = require("express");

const getAllTest = async (req, res) => {
  try {
    /* build query */
    // 1) filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    //make queryObj keep only filter object such as {name : 'tare'}
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2) advance filtering

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryStr = JSON.parse(queryStr);

    const query = testModel.find(queryStr);

    /* execute query */
    const tests = await query;

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

module.exports = { createTest, getAllTest, getTest, updateTest, deleteTest };
