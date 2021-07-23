const {
  authJwt
} = require("../middleware");
var express = require('express');
var Router = express.Router();
const core = require('../../core.js');

Router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

/**
 * @swagger
 * /user/test/all:
 *   get:
 *     description: test request to get public content
 *     tags:
 *       - user
 *     produces:
 *       - application/json
 *     responses:
 *       "200":
 *         description: ok

 */
Router.get("/test/all", core.controller.user.allAccess);

Router.get(
  "/user",
  [authJwt.verifyToken],
  core.controller.user.userBoard
);

Router.get(
  "/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  core.controller.user.moderatorBoard
);

Router.get(
  "/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  core.controller.user.adminBoard
);

Router.get(
  "/getUserInfo",
  [authJwt.verifyToken],
  core.controller.user.getUserInfo
);

exports.router = Router;
exports.path = 'user'