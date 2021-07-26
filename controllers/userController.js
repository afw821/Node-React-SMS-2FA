const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userController = {
  registerUser: async function (req, res) {
    console.log("----------Register User------------------");
    //need to figure out logic for checking if username is registerd too
    const { email, userName } = req.body;
    console.log("--------email----", email);
    console.log("--------userName----", userName);
    console.log("req.body------------", req.body);
    req.body.isAdmin = 0;
    try {
      let user = await db.User.findOne({
        where: {
          email: email,
        },
      });

      if (user)
        return res
          .status(400)
          .send("User already registered with this email address.");
      let isUserNameTaken = await db.User.findOne({
        where: {
          userName: userName,
        },
      });
      if (isUserNameTaken)
        return res
          .status(400)
          .send(`The user name ${userName} is already in use`);
      const newUser = await db.User.create(req.body);
      res.json(newUser);
    } catch (ex) {
      console.log("-----Error-----", ex);
      res.json(ex);
    }
  },
  getUserById: async function (req, res) {
    try {
      const users = await db.User.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!users) return res.status(404).send("Error Finding Users");

      res.json(users);
    } catch (ex) {
      console.log("-----Error-----", ex);
      res.json(ex);
    }
  },
  getAllUsers: async function (req, res) {
    try {
      const users = await db.User.findAll({});

      if (!users) return res.status(404).send("Error Finding Users");

      res.json(users);
    } catch (error) {
      console.log("-----Error-----", ex);
      res.json(ex);
    }
  },
  updateUser: async function (req, res) {
    //need to add logic here to lookup if user chage email and / or pw that they don't already exist
    try {
      const user = await db.User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.json(user);
    } catch (error) {
      console.log("-----Error-----", ex);
      res.json(ex);
    }
  },
  updateUserValidationCode: async function (req, res) {
    console.log("req*****", req.dataValues);
    try {
      const user = await db.User.update(req.dataValues, {
        where: {
          id: req.dataValues.id,
        },
      });
      return user;
    } catch (error) {
      console.log("-----Error-----", ex);
      res.json(ex);
    }
  },
  updateUser_forgot_pw: async function (req, res) {
    try {
      const { userId, token } = req.params;
      const { password } = req.body;

      let user = await db.User.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) return res.status(400).send("Unable to find user");
      //else update the user w/ req.body.password

      const secret = user.password + "-" + user.createdAt;
      const payload = jwt.decode(token, secret);
      if (payload.userId === user.id) {
        const salt = await bcrypt.genSalt(10);
        const newHashPw = await bcrypt.hash(password, salt);

        const updatedUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          country: user.country,
          email: user.email,
          password: newHashPw,
          isAdmin: user.isAdmin,
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
    } catch (ex) {
      console.log("-----Error-----", ex);
      res.json(ex);
    }
  },
};

module.exports = userController;
