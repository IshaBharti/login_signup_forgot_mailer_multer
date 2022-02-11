const User = require("../model/userModel");
const router = require("../routes/admin");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../model/userModel");
const getUser = async (req, res) => {
  try {
    return res.send({ status: 200, message: "Succesfully" });
  } catch (err) {
    console.log(err.message);
    return res.send({ status: 500, message: "Something went wrong, please try again later!" });
  }
};
const insertdata = async (req, res) => {
  const pass = await bcrypt.hash(req.body.password, 10);

  const data_storing = {
    fullName: req.body.fullName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: pass,
  };

  const img = req.files[0].filename;

  console.log(img, "fileName");
  const data = { ...data_storing, img };
  try {
    const obg = await new User({ ...data, img });
    console.log(obg);
    obg.save();
    return res.status(200).send({ status: 200, message: "sign up has suceesfully", data });
  } catch (err) {
    console.log("error", err);
    return res.status(500).send({ status: 500, message: "Something went wrong" });
  }
};
const getDocument = async (req, res) => {
  // for get data
  try {
    const result = await User.find();
    console.log(result);
    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.send(err.message);
  }
};
// update Document
const updateDocument = async (req, res) => {
  const data = req.body;

  const result = await User.findOne({
    fullName: data.fullName,
    _id: { $ne: req.params.id },
  });

  const id = req.params.id;
  try {
    const idData = await User.findOne({ _id: id });
    console.log(idData);
    if (!idData) {
      res.status(409).send({ status: 200, message: "dfhadL" });
    }
  } catch (err) {
    res.status(200).send({ status: 200, message: "User not found" });
  }
  if (result) {
    res.status(409).send({ status: 200, message: "Same name is already exist take another name" });
    console.log("+++++++++++++++++++++");
  }
  try {
    const result = await User.updateOne(
      { _id: req.params.id },
      {
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
      }
    );

    console.log(result, "hello");
    res.send({ status: 200, message: "Succesfully Update Doc" });
  } catch (err) {
    console.log(err.message);
  }
};
const singleDocument = async (req, res) => {
  try {
    const result = await User.findOne(
      { _id: req.params.id },
      {
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
      }
    );

    // console.log(result, "hello");
    // res.send(result);
    // res.send({ status: 200, message: "succesfulupdate Doc" });
  } catch (err) {
    console.log(err.message);
  }
};
// Delete user
const deleteDocument = async (req, res) => {
  try {
    const result = await User.deleteOne({ id: req.params.id });
    console.log(result);

    res.send({ status: 200, message: "Deleted successfully" });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getUser,
  insertdata,
  getDocument,
  updateDocument,
  singleDocument,
  deleteDocument,
};
