const bcrypt = require("bcryptjs");
const hashPassword = async function (user) {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.isAdmin = false;
};

module.exports = function (connection, Sequelize) {
  const User = connection.define("User", {
    // Giving the Author model a name of type STRING
    firstName: {
      type: Sequelize.STRING,
      validate: {
        len: [2, 50],
      },
    },
    lastName: {
      type: Sequelize.STRING,
      validate: {
        len: [2, 50],
      },
    },
    userName: {
      type: Sequelize.STRING,
      validate: {
        len: [2, 50],
      },
    },
    phoneNo: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        len: [5, 50],

        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        len: [5, 550],
      },
    },
    validationCode: {
      type: Sequelize.INTEGER,
      // validate: {
      //   len: [5, 550],
      // },
    },
    isAdmin: {
      type: Sequelize.INTEGER,
    },
  });

  User.beforeCreate(hashPassword);

  return User;
};
