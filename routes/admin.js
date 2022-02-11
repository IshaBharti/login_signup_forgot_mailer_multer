var express = require("express");
var router = express.Router();
const loginController= require("../controllers/loginController");
router.post("/login", loginController.login);
router.post('/forgotpassword',loginController.forgot_password);
router.post('/resetPass/:id',loginController.resetPassword)


module.exports = router;
