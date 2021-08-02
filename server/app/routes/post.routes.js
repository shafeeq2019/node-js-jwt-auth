const {
  authJwt
} = require("../middleware");
const core = require('../../core.js');
var express = require('express');
var Router = express.Router();
let schemas = core.schemas;

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



//posts
Router.post(
  "/",
  [
    authJwt.verifyToken,
    core.validator(schemas.post.post, 'body'),
  ],
  core.controller.post.add
);


Router.get(
  "/:postId",
  [
    authJwt.verifyToken,
    core.validator(schemas.post.getById, 'params'),
  ],
  core.controller.post.getPost
);


Router.get(
  "/",
  [authJwt.verifyToken],
  core.controller.post.getPost
);


Router.delete(
  "/:postId",
  [
    authJwt.verifyToken,
    core.validator(schemas.post.getById, 'params'),
  ],
  core.controller.post.delete
);


//likes
Router.get(
  "/:postId/like",
  [
    authJwt.verifyToken,
    core.validator(schemas.post.getById, 'params'),
  ],
  core.controller.like.get
);

Router.post(
  "/:postId/like",
  [
    authJwt.verifyToken,
    core.validator(schemas.post.getById, 'params'),
  ],
  core.controller.like.add
);

//comments
Router.get(
  "/:postId/comment",
  [
    authJwt.verifyToken,
    core.validator(schemas.post.getById, 'params'),
  ],
  core.controller.comment.get
);

Router.post(
  "/:postId/comment",
  [
    authJwt.verifyToken,
    core.validator(schemas.post.postComment.params, 'params'),
    core.validator(schemas.post.postComment.body, 'body'),
  ],
  core.controller.comment.add
);

Router.get(
  "/:postId/comment/:commentId",
  [
    authJwt.verifyToken,
    core.validator(schemas.comment.getById, 'params'),
  ],
  core.controller.comment.get
);

Router.delete(
  "/:postId/comment/:commentId",
  [
    authJwt.verifyToken,
    core.validator(schemas.comment.getById, 'params'),
  ],
  core.controller.comment.delete
);

Router.put(
  "/:postId/comment/:commentId",
  [
    authJwt.verifyToken,
    core.validator(schemas.comment.getById, 'params'),
    core.validator(schemas.comment.put, 'body'),
  ],
  core.controller.comment.update
);







exports.router = Router;
exports.path = 'post'