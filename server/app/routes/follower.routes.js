const {
    authJwt
  } = require("../middleware");
  const controller = require("../controllers/follower.controller");
  var express = require('express');
  var Router = express.Router();
  
  Router.post(
    "/add",
    [authJwt.verifyToken],
    controller.add
  );
  
  Router.post(
    "/delete",
    [authJwt.verifyToken],
    controller.delete
  );

  Router.get(
    "/getUserFollowers",
    [authJwt.verifyToken],
    controller.getUserFollowers
  );

  Router.get(
    "/getFollowers",
    [authJwt.verifyToken],
    controller.getFollowers
  );
  
  

  
  
  exports.router = Router;
  exports.path = 'follower'
  