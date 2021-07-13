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

Router.delete(
  "/:id",
  [authJwt.verifyToken],
  controller.delete
);


Router.get(
  "/getFollowersPosts",
  [authJwt.verifyToken],
  controller.getFollowersPosts
);

Router.get(
  "/getUserPost/:id",
  [authJwt.verifyToken],
  controller.getUserPost
);


Router.get(
  "/",
  [authJwt.verifyToken],
  controller.getAll
);


Router.get(
  "/:id",
  [authJwt.verifyToken],
  controller.getByPostId
);



exports.router = Router;
exports.path = 'post'