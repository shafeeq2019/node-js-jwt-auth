const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const core = require('../../core.js')

checkDuplicateUsernameOrEmail = (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).send(core.controller.api.createErrorMessage("Failed! please give your username, email and your password !"));
  }
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      return res.status(400).send(core.controller.api.createErrorMessage("Failed! Username is already in use!"));
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        return res.status(400).send(core.controller.api.createErrorMessage("Failed! Email is already in use!"));
      }
      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send(core.controller.api.createErrorMessage("Failed! Role does not exist = " + req.body.roles[i]));
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
