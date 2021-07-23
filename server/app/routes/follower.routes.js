const {
    authJwt
  } = require("../middleware");
  const core = require('../../core.js');
  var express = require('express');
  var Router = express.Router();
  
  Router.post(
    "/",
    [authJwt.verifyToken],
    core.controller.follower.add
  );
  
  Router.delete(
    "/:id",
    [authJwt.verifyToken],
    core.controller.follower.delete
  );

  // Router.get(
  //   "/getUserFollowers",
  //   [authJwt.verifyToken],
  //   controller.getUserFollowers
  // );

  Router.get(
    "/getFollowers/:id",
    [authJwt.verifyToken],
    core.controller.follower.getFollowers
  );
  
  
  exports.router = Router;
  exports.path = 'follower'
  