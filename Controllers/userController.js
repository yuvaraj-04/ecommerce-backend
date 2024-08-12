const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });
    const token = jwt.sign({ user_id: user._id,email:user.email }, "secert_token", {
      expiresIn: "1h",
    });
    return res.status(200).json(token);
  } catch (e) {
    console.error(e);
  }
};
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({
    username,
    email,
    password,
  });
  try {
    await user.save();
    res.status(200).json({ message: "User Created Successfully" });
  } catch (e) {
    console.log(e);
  }
};
exports.getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (err) {
    console.error(err);
  }
};
