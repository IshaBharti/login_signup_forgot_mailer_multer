var express = require("express");
var router = express.Router();
var connections = require("../connections/db");
var usermodels = require("../model/userModel");
var userControllers = require("../controllers/userControllers");
const { check, validationResult } = require("express-validator");
const validator = require("../validator");
const { uploadFile } = require("../middleWare/multer_middleware");

/* GET users listing. */
router.get("/getUser", userControllers.getUser);
router.post(
  "/insertUser",
  uploadFile,

  [
    check("fullName").not().isEmpty().withMessage("name field is required"),
    check("email").not().isEmpty().isEmail().withMessage("Email Not exist"),
    check("phoneNumber")
      .not()
      .isEmpty()
      .isNumeric()
      .isLength({ min: 10 })
      .withMessage("PhoneNumber is Not Valid"),
    check("password").not().isEmpty().isLength({ min: 5 }).withMessage("password length is 6"),
  ],
  validator,

  userControllers.insertdata
);

router.get("/getDoc", userControllers.getDocument);
router.put("/updateDoc/:id", userControllers.updateDocument);
router.get("/singleData/:id", userControllers.singleDocument);
router.get("/deleteData/:id", userControllers.deleteDocument);

module.exports = router;
