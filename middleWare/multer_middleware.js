const multer = require("multer");
const { uploadImg } = require("../multer");

const uploadFile = (req, res, next) => {
  const upload = uploadImg.array("img");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ status: false, message: err.message });
    } else if (err) {
      return res.status(400).json({ status: false, message: err.message });
    }
    next();
  });
};
module.exports = { uploadFile };
