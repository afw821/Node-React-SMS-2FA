const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const emailController = require("./emailController");
const { appUrl, deployedAppUrl } = require("../config/urlConfig.json");
const authController = {
  login: async function (req, res) {
    const { userName, password } = req.body;

    try {
      let user = await db.User.findOne({
        where: {
          userName: userName,
        },
        include: [db.Purchase],
      });
      if (!user)
        return res.status(400).send("Invalid User name and / or password");
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(400).send("Invalid User name and / or password");

      const token = authController.generateAuthToken(user);

      //res.header("x-auth-token", token).send(token);

      res.cookie("token", token, {
        expires: new Date(Date.now() + 3600000), //1hr
        secure: process.env.NODE_ENV === "production",
      });

      res.json({ token });
    } catch (ex) {
      console.log("-----Error-----", ex);
      res.json(ex);
    }
  },
  updatePassword: async function (req, res) {
    try {
      const { email, oldPassword, newPassword } = req.body;

      let user = await db.User.findOne({
        where: {
          email: email,
        },
      });

      if (!user)
        return res
          .status(400)
          .send(`Unable to locate user with email: ${email}`);

      const validPassword = await bcrypt.compare(oldPassword, user.password);

      if (!validPassword)
        return res.status(400).send("Old Password is invalid");
      //hash new password
      const salt = await bcrypt.genSalt(10);
      const newHashPw = await bcrypt.hash(newPassword, salt);

      const updatedUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        country: user.country,
        email: email,
        password: newHashPw,
        isAdmin: user.isAdmin,
      };

      const result = await db.User.update(updatedUser, {
        where: {
          email: email,
        },
      });

      res.json(result);
    } catch (ex) {
      console.log("-----Error-----", ex);
      res.json(ex);
    }
  },
  generateAuthToken: function (user) {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: !user.isAdmin ? false : true,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        Purchases: user.Purchases,
      },
      process.env.JWT_PRIVATEKEY,
      { expiresIn: 3600 } //make it expire in one hr
    );
  },
  isTokenValid: async function (req, res) {
    //for forgot password functionality
    try {
      const { token, userId } = req.body;

      let user = await db.User.findOne({
        where: {
          id: userId,
        },
      });
      const secret = user.password + "-" + user.createdAt;
      const decoded = jwt.verify(token, secret);

      if (decoded.userId == userId) res.json({ isTokenValid: true });
    } catch (ex) {
      if (ex) res.json({ ex, isTokenValid: false });
    }
  },
  forgotPasswordEmail: async function (req, res) {
    //sends email w / reset link
    try {
      const { email } = req.params;

      let user = await db.User.findOne({
        where: {
          email: email,
        },
      });
      if (!user)
        return res
          .status(400)
          .send(`No user with email ${email} is registered`);

      emailController.sendForgot_pw_email(user);

      res.json({ complete: true });
    } catch (ex) {
      console.log("-----Error-----", ex);
      res.json(ex);
    }
  },
  usePasswordHashToMakeToken: function ({
    password: passwordHash,
    id: userId,
    createdAt,
  }) {
    const secret = passwordHash + "-" + createdAt;
    const token = jwt.sign({ userId }, secret, {
      expiresIn: 3600, // 1 hour
    });

    return token;
  },
  getPasswordResetURL: function (user, token) {
    return `${deployedAppUrl}/${user.id}/${token}`;
  },
};

module.exports = authController;
