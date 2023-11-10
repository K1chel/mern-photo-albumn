import User from "../models/user.js";
import bcrypt from "bcrypt";
import generateToken from "../lib/generateToken.js";
import vaidator from "validator";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) return res.status(400).json({ error: "User already exists" });

    if (!username)
      return res.status(400).json({ error: "Username is required" });
    if (!email) return res.status(400).json({ error: "Email is required" });
    if (!vaidator.isEmail(email))
      return res.status(400).json({ error: "Email is invalid" });
    if (!password)
      return res.status(400).json({ error: "Password is required" });

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    if (newUser) {
      generateToken(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log(`ERROR in registerUser: ${error.message}`.red.underline.bold);
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    console.log(`ERROR in logout: ${error.message}`.red.underline.bold);
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isMatchPassword = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isMatchPassword)
      return res.status(400).json({ error: "Invalid credentials" });

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    console.log(`ERROR in loginUser: ${error.message}`.red.underline.bold);
    res.status(500).json({ error: error.message });
  }
};

export { registerUser, logout, loginUser };
