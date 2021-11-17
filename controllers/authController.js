const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const emailController = require("./emailController");
const { appUrl, deployedAppUrl } = require("../config/urlConfig.json");
const codeCreator = require("../utils/validationCode");
const userController = require("./userController");
const smsController = require("../controllers/smsController");
const validationCode = require("../utils/validationCode");
const authController = {
  firstLevelAuth: async function (req, res) {
    const { userName, password } = req.body;

    try {
      let user = await db.User.findOne({
        where: {
          userName: userName,
        },
      });
      if (!user)
        return res.status(400).send("Invalid User name and / or password");
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(400).send("Invalid User name and / or password");

      //assign random token to user need to call to update user
      const validationCode2FA = codeCreator.createValiadtionCode(9, 1);

      codeCreator.validationCodeArray = [];
      user.validationCode = validationCode2FA;
      const result = await userController.updateUserValidationCode(user, res); //update user with new validation code

      if (!result)
        res
          .status(404)
          .send(
            "There was an issue generating your validation code. Please try again later"
          );
      //res.header("x-auth-token", token).send(token);
      req.body.message = `Hello ${user.firstName}, your validation code is ${validationCode2FA}`;
      smsController.sendSMS(req, res, user);
      const token = authController.generateAuthToken(user);

      res.json({ validPassword, user, token });
    } catch (ex) {
      console.log("-----Error-----", ex);
      res.json(ex);
    }
  },
  secondLevelAuth: async function (req, res) {
    try {
      const { validationCode } = req.body;

      let user = await db.User.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!user) return res.status(400).send("Can't locate user");

      const isValidationCodeValid = codeCreator.compare(
        validationCode,
        user.dataValues.validationCode
      );

      if (!isValidationCodeValid)
        return res.status(400).send("Invalid code. Please try again");

      const token = authController.generateAuthToken(user);

      res.cookie("AUTH_SESSION_TOKEN", token, {
        expires: new Date(Date.now() + 3600000), //1hr
        secure: process.env.NODE_ENV === "production",
      });

      res.json({ token });
    } catch (error) {
      res.json(error);
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
      else res.json({ isTokenValid: false });
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
  updateForgetPw: async function (req, res) {
    try {
      console.log("made it here updateForgot pw");
      const { userId } = req.params;
      const { password, token } = req.body;

      let userEntity = await db.User.findOne({
        where: {
          id: userId,
        },
      });
      if (!userEntity) return res.status(400).send("Unable to find user");
      //else update the user w/ req.body.password
      console.log("----user entity---", userEntity);
      const secret = userEntity.password + "-" + userEntity.createdAt;
      const payload = jwt.decode(token, secret);
      if (payload.userId === userEntity.id) {
        const salt = await bcrypt.genSalt(10);
        const newHashPw = await bcrypt.hash(password, salt);

        const updatedUser = {
          firstName: userEntity.firstName,
          lastName: userEntity.lastName,
          address: userEntity.address,
          address2: userEntity.address2,
          city: userEntity.city,
          state: userEntity.state,
          zipCode: userEntity.zipCode,
          email: userEntity.email,
          password: newHashPw,
          isAdmin: userEntity.isAdmin,
        };

        const result = await db.User.update(updatedUser, {
          where: {
            id: userId,
          },
        });

        res.json({ result, complete: true });
      } else {
        res
          .status(400)
          .json({ message: "Unable to decode JWT and change password" });
      }
    } catch (error) {}
  },
  getPasswordResetURL: function (user, token) {
    return `${deployedAppUrl}/${user.id}/${token}`;
  },
};

module.exports = authController;
