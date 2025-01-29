const mongoose = require("mongoose");
const { z } = require("zod");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const users = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstname: String,
  lastname: String,
});

const admin = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstname: String,
  lastname: String,
});

const courses = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  createrId: ObjectId,
});

const purchaseSchema = new Schema({
    userId:ObjectId,
    courseId:ObjectId,
  email: String,
  password: String,
  firstname: String,
  lastname: String,
});

const userModel = mongoose.model("users", users);
const adminModel = mongoose.model("admin", admin);
const courseModel = mongoose.model("courses", courses);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};
