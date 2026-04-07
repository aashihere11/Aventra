const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UsersModel } = require("../Models/UsersModel")
const { WalletModel } = require("../Models/WalletsModel");

// signup user
router.post("/create", async (req, res) => {
  const { username, password, email } = req.body;

  const isAlreadyRegistered = await UsersModel.findOne({
    $or: [{ username }, { email }]
  });

  if (isAlreadyRegistered) {
    return res.status(409).json({
      message: "username or email already exists"
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format!" });
  }

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      const User = await UsersModel.create({
        username,
        email,
        password: hash
      })
        await WalletModel.create({userId: User._id, balance: 0});

      const token = jwt.sign({ email, username }, process.env.JWT_SECRET);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 604800000
      });
      
      res.status(201).json({ success: true, message: "User created successfully" });
    });
  });
});

//login user

router.post('/login', async (req, res) => {
  const user = await UsersModel.findOne({ username: req.body.username });
  if (!user) {
    return res.status(404).json({ message: "something went wrong" });
  }

  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 604800000
      });
      res.status(201).json({ success: true, user: { username: user, email: user.email } });
    }
    else {
      return res.status(404).json({
        message: "password is incorrect"

      });
    }
  })
});

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("Logout error:", error);
    return res.status(500).json({ success: false });
  }
})

module.exports = router;
