require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const TestRouter = require("./routes/Test");

app.use("/api/v1/tests", TestRouter);

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

app.listen(process.env.PORT, () => {
  console.log("server is running on port" + process.env.PORT);
});
