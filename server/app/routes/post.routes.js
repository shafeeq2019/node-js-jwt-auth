const {
  authJwt
} = require("../middleware");
const core = require('../../core.js');
var express = require('express');
var Router = express.Router();


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
  [
    authJwt.verifyToken,
    core.validator(core.schemas.post.post, 'body'),
  ],
  core.controller.post.add
);



Router.get(
  "/:postId",
  [authJwt.verifyToken],
  core.controller.post.getPost
);


Router.get(
  "/:postId/comment",
  [
    authJwt.verifyToken,
    core.validator(core.schemas.post.getById, 'params'),
  ],
  core.controller.comment.getComment
);

Router.get(
  "/:postId/comment/:commentId",
  [
    authJwt.verifyToken,
    core.validator(core.schemas.comment.getById, 'params'),
  ],
  core.controller.comment.getComment
);


Router.delete(
  "/:postId",
  [
    authJwt.verifyToken,
    core.validator(core.schemas.post.getById, 'params'),
  ],
  core.controller.post.delete
);



Router.get(
  "/",
  [authJwt.verifyToken],
  core.controller.post.getPost
);


exports.router = Router;
exports.path = 'post'