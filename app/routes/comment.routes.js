const {
  authJwt
} = require("../middleware");
const controller = require("../controllers/comment.controller");
var express = require('express');
var Router = express.Router();

Router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

Router.post("/api/comment/add", [authJwt.verifyToken], controller.postComment);
Router.post("/api/comment/update", [authJwt.verifyToken], controller.updateComment);

exports.router = Router;
exports.path = 'comment'