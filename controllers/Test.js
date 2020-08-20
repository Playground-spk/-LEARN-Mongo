const testModel = require("../model/Test");

const getAllTest = (req, res) => {};

const createTest = async (req, res) => {
  const test = new testModel(req.body);
  try {
    const complete = await test.save();
    res.status(201).send(complete);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { createTest };
