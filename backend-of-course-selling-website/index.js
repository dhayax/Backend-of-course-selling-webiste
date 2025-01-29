require('dotenv').config()


const express = require("express");
const app = express();
const port = 3000;
const { z } = require("zod");
const bcrypt = require("bcrypt");
app.use(express.json());

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

//mongodb
const mongoose = require("mongoose");

const { userModel, adminModel, courseModel, purchaseModel } = require("./db");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}

main();
