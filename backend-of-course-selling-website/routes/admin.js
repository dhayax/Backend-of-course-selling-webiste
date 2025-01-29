const { Router } = require("express");
const adminRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");
const { adminModel, courseModel } = require("../db");
const { adminMiddleware } = require("../middlewares/admin");

adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    await adminModel.create({
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

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const response = await adminModel.findOne({
    email,
  });
  const ogPassword = bcrypt.compare(password, response.password);
  if (ogPassword) {
    const token = jwt.sign(
      {
        id: response._id.toString(),
      },
      JWT_ADMIN_SECRET
    );
    res.json({
      token,
    });
  } else {
    res.json({
      message: "incorrect email or password",
    });
  }
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId;
  const { title, description, price, imageUrl } = req.body;

  await courseModel.create({
    title,
    description,
    price,
    imageUrl,
    createrId: adminId,
  });
  res.json({
    message: "course uploaded",
  });
});

adminRouter.put("/course", (req, res) => {
  res.json({
    message: "signup endpoint",
  });
});

adminRouter.get("/course/bulk", (req, res) => {
  res.json({
    message: "signup endpoint",
  });
});

module.exports = {
  adminRouter,
};
