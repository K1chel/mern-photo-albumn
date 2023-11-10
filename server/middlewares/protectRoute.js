import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    req.user = user;

    next();
  } catch (error) {
    console.log(`ERROR in protectRoute: ${error.message}`.red.underline.bold);
    res.status(500).json({ error: error.message });
  }
};

export default protectRoute;
