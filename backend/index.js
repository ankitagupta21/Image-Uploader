const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require("./database");

app.get("/", cors(), (req, res) => {});
const authController = require("./controllers/authController");
const imageController = require("./controllers/imageController");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

app.post("/", authController.login);
app.post("/register", authController.register);
app.post("/resetpassword", authController.resetPassword);
app.post("/home", upload.single("image"), imageController.upload);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
