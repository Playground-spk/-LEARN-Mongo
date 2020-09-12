const testModel = require("../model/Test");
const { db } = require("../model/Test");
const { json } = require("express");

const getAllTest = async (req, res) => {
  try {
    /* build query */
    // 1A) filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    //make queryObj keep only filter object such as {name : 'tare'}
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) advance filtering

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryStr = JSON.parse(queryStr);

    let query = testModel.find(queryStr);

    // 2) Sorting

    if (req.query.sort) {
      let sortBy = req.query.sort.split(",").join(" ");

      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // 3) field limiting

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // 4) Pagination

    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

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
