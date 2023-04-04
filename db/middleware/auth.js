const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "hithere");

    const user1 = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user1) {
      throw new Error();
    }
    req.user = user1;
    req.token = token;
  } catch (e) {
    return res.status(401).send({ error: "Please authenticate" });
  }
  next();
};
module.exports = auth;
