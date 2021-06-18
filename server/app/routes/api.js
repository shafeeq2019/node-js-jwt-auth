var express = require('express');
var Router = express.Router();
const swagggerController = require('../controllers/swagger.controller.js').Router;

let api = {
  auth: require('./auth.routes'),
  user: require('./user.routes'),
  post: require('./post.routes'),
  comment: require('./comment.routes'),
  like: require('./like.routes'),
}

Router.use("/api-docs", swagggerController);

for (let [key, value] of Object.entries(api)) {
  Router.use(`/${value.path}`, value.router)
}


module.exports = Router;
