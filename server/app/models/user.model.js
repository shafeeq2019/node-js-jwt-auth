module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: {
          msg: "please enter a valid email address"
        }
      }
    },
    password: {
      type: Sequelize.STRING
      // validate: {
      //   len: {
      //     msg: "password must have at least 6 letters",
      //     args:[6,10]
      //   }
      // }
    }
  });

  return User;
};
