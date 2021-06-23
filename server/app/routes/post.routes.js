const {
  authJwt
} = require("../middleware");
const controller = require("../controllers/post.controller");
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


Router.get(
  "/getMyPosts",
  [authJwt.verifyToken],
  controller.getUserPosts
);

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
  "/getAll",
  [authJwt.verifyToken],
  controller.getAll
);




exports.router = Router;
exports.path = 'post'
