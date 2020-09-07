const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Test = require("../../model/Test");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    //console.log(con.connection);
    console.log("db connection successful");
  });

//READ JSON FILE
const tests = JSON.parse(
  fs.readFileSync(`${__dirname}/toursSimpleData.json`, "utf-8")
);
console.log(tests);

//IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Test.create(tests);
    console.log("data successfully loaded");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

//DELETE ALL DATA FROM COLLECTION

const deleteData = async () => {
  try {
    await Test.deleteMany();
    console.log("data successfully deleted");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
