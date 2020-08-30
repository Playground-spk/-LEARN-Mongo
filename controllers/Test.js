const testModel = require("../model/Test");
const { db } = require("../model/Test");

const getAllTest = async (req, res) => {
  try {
    const tests = await testModel.find();

    res.status(200).json({
      status: "success",
      result: tests.length,
      data: {
        tests,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
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
