const express = require("express");
const router = new express.Router();
const User = require("../db/models/user");
const auth = require("../db/middleware/auth");
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user: user.getProfile(), token });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    return res.send({ user: user.getProfile(), token });
  } catch (e) {
    return res.status(400).send();
  }
});
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.status(200).send(req.user);
  } catch (e) {
    return res.status(500).send();
  }
});
router.post("/users/logout/all", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(400).send(req.user);
  } catch (e) {
    return res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send({ user: req.user.getProfile() });
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const user = await User.findById(req.user._id);
    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();

    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.delete("/users/me", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
