const {
  authJwt
} = require("../middleware");
const controller = require("../controllers/post.controller");
var express = require('express');
var Router = express.Router();


Router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

Router.post("/api/like/add", [authJwt.verifyToken], controller.postLikeToPost);

exports.router = Router;
exports.path = 'user'