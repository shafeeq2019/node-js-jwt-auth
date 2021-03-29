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

Router.get(
  "/",
  function(req,res) {
    console.log("trig")
    res.send("ok")
  }
);

Router.get(
  "/getAll",
  [authJwt.verifyToken],
  controller.getUserPosts
);

/**
 * @swagger
 * /post/add:
 *    post:
 *      tags:
 *      - "post"
 *      description: add a post
 *    parameters:
 *      - name: post
 *        in: body
 *        description: text of the post you want to added
 *        required: true
 *        content:
*           application/json:
 *        schema:
 *          type: string
 *
 *    responses:
 *      '201':
 *        description: Successfully created user
 */

 /**
  * @swagger
  * /post/:
  *    get:
  *      tags:
  *      - "post"
  *      description: add a post
  *
  *    responses:
  *      '201':
  *        description: Successfully created user
  */



Router.post(
  "/add",
  [authJwt.verifyToken],
  controller.addPost
);

Router.post("/api/post/like", [authJwt.verifyToken], controller.postLikeToPost);

exports.router = Router;
exports.path = 'post'
