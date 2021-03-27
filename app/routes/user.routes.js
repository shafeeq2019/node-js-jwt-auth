const {
  authJwt
} = require("../middleware");
const controller = require("../controllers/user.controller");
var express = require('express');
var Router = express.Router();

Router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

Router.get("/api/test/all", controller.allAccess);

Router.get(
  "/api/test/user",
  [authJwt.verifyToken],
  controller.userBoard
);

Router.get(
  "/api/test/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  controller.moderatorBoard
);

Router.get(
  "/api/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard
);

exports.router = Router;
exports.path = 'user'