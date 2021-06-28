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
  

  
  
  exports.router = Router;
  exports.path = 'follower'
  