const express = require("express");
const Router = express.Router;
const userRouter = Router();
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const{JWT_USER_SECRET}=require('../config')
const { userModel } = require("../db");


userRouter.post("/signup", async (req, res) => {
  //todos
  //1.adding zod validation:done
  //2.hash the password and stores it in db:done
  //3.put inside the try catch block
  /*
  const requireBody = z.object({
    email: z.string.min(3).max(100).email(),
    password: z.string.min(3).max(30),
    firstname: z.string.min(3).max(30),
    secondname: z.string.min(3).max(30),
  });
  const parsedData = requireBody.safeParse(req.body);
  if (!parsedData) {
    res.json({
      message: "incorrect format",
    });
    return;
  }
    */
  const { email, password, firstname, lastname } = req.body;

  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    await userModel.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
    });
  } catch (error) {
    res.json({
      message: "unfortunate error occurs",
      error: error,
    });
  }
  res.json({
    message: "signup succeeded",
  });
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const response = await userModel.findOne({
    email,
  });
  const ogPassword = bcrypt.compare(password, response.password);
  if (ogPassword) {
    const token = jwt.sign(
      {
        id: response._id.toString(),
      },
      process.env.JWT_USER_SECRET
    );
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "incorrect email or password",
    });
  }
});

userRouter.get("/purchases", (req, res) => {
  res.json({
    message: "your courses",
  });
});
module.exports = {
  userRouter,
};
