var express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const generateToken = require("../auth/jwt");
const userModel = require("../model/userModel");
const { token } = require("morgan");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { email, sendingEmail } = require("../node_mailer");

const login = async (req, res) => {
  const password = req.body.password;
  try {
    const data = await User.findOne({ email: req.body.email });

    if (data) {
      if (await bcrypt.compare(password, data.password)) {
        const token = generateToken(data._id);

        return res.status(200).send({ status: true, message: "login successful", token: token });
      } else {
        return res.send("incorrect password");
      }
    } else {
      return res.status(404).send({ status: false, message: "User Not exist " });
    }
  } catch (err) {
    return res.status(404).send({ status: false, meessage: "user Not exist or not found" });
  }
};

const forgot_password = async (req, res) => {
  try{let data = await User.findOne({ email: req.body.email });
  res.status(200).send({status:200,message:"Check mail for reset"})
}catch(err){
  res.status(404).send({status:400,message:"Something error"})
}
  
  sendingEmail(data.email,data._id);

};
const resetPassword=async(req,res)=>{
  const id = req.params.id;

  try {
    const idData = await User.findOne({ _id: id });
    console.log(idData,">>>>>>>>...");
    console.log("oisha");

  const pass = await bcrypt.hash(req.body.password, 10);
  const result = await User.updateOne(
    
  { _id: req.params.id },
  {
    password: pass,
   
  }
);

console.log(result, "hello");
res.send({ status: 200, message: "Succesfully Update Doc" });
} catch (err) {
console.log(err.message);
}
};


module.exports = { login, forgot_password,resetPassword };
