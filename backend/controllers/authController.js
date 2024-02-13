const user = require("../models/User");
const bcrypt = require("bcrypt");

async function register(req, res) {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const data = {
    name: name,
    email: email,
    password: hashedPassword,
  };
  console.log(data);
  try {
    const check = await user.findOne({ email: email });
    if (check) {
      res.status(403).json("exist");
    } else {
      res.status(201).json("notexist");
      await user.insertMany([data]);
    }
  } catch (e) {
    res.status(500).json("fail");
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const check = await user.findOne({ email: email });

    if (check && (await bcrypt.compare(password, check.password))) {
      res.status(201).json({
        name: check.name,
        message: "exist",
      });
    } else {
      res.status(403).json({
        message: "notexist",
      });
    }
  } catch (e) {
    res.status(500).json("fail");
  }
  return;
}

async function resetPassword(req, res) {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const check = await user.findOne({ email: email });
    if (check) {
      await user.updateOne({ email: email }, { password: hashedPassword });
      res.status(201).json("success");
    } else {
      res.status(403).json("fail");
    }
  } catch (e) {
    res.status(500).json("fail");
  }
}

module.exports = {
  register,
  login,
  resetPassword,
};
