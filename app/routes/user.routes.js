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
Router.get("/test/all",  [authJwt.verifyToken], controller.allAccess);

Router.get(
  "/user",
  [authJwt.verifyToken],
  controller.userBoard
);

Router.get(
  "/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  controller.moderatorBoard
);

Router.get(
  "/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard
);

exports.router = Router;
exports.path = 'user'