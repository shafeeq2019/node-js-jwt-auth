const {
  authJwt
} = require("../middleware");
const controller = require("../controllers/post.controller");
const commentController = require("../controllers/comment.controller");
var express = require('express');
var Router = express.Router();
let core = require('../../core.js')


/**
 * @swagger
 * /post/getAll:
 *  get:
 *   description: get all user Posts
 *   tags:
 *    - post
 *   produces:
 *    - application/json
 *   requestBody:
 *     description: Optional description in *Markdown*
 *     content:
 *       application/json:
 *   responses:
 *      "200":
 *        description: list of all posts
 * 
 */


/**
 * @swagger
 * /post/add:
 *  post:
 *   description: add a new post
 *   tags:
 *    - post
 *   produces:
 *    - application/json
 *   requestBody:
 *     description: Optional description in *Markdown*
 *     content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/post'
 *   responses:
 *      "200":
 *        description: test
 * 
 */



Router.post(
  "/",
  [authJwt.verifyToken],
  controller.add
);

Router.get(
  "/:postId",
  [authJwt.verifyToken],
  controller.getPost
);

Router.get(
  "/:postId/comment",
  [authJwt.verifyToken],
  commentController.getComment
);

Router.get(
  "/:postId/comment/:commentId",
  [authJwt.verifyToken],
  commentController.getComment
);


Router.delete(
  "/:id",
  [authJwt.verifyToken],
  controller.delete
);


Router.get(
  "/follower",
  [authJwt.verifyToken],
  controller.getFollowersPosts
);


Router.get(
  "/",
  [authJwt.verifyToken],
  controller.getPost
);


exports.router = Router;
exports.path = 'post'