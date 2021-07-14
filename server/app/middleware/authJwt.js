const jwt = require("jsonwebtoken");
const config = require('../config/config.js');
const db = require("../models");
const User = db.user;
const core = require('../../core.js')

verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
  } else {
    // Forbidden
    return res.status(403).send(core.controller.api.createErrorMessage("No token provided!"));
  }


  jwt.verify(req.token, global.gConfig.auth.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send(core.controller.api.createErrorMessage("Unauthorized!"));
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      return res.status(403).send(core.controller.api.createErrorMessage("Require Admin Role!"));
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      res.status(403).send(core.controller.api.createErrorMessage("Require Moderator Role!"));
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send(core.controller.api.createErrorMessage("Require Moderator or Admin Role!"));
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;