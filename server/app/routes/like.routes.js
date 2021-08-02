const {
  authJwt
} = require("../middleware");
const controller = require("../controllers/like.controller");
var express = require('express');
var Router = express.Router();
const core = require('../../core.js');
let schemas = core.schemas;
Router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

/**
 * @swagger
 * /like/add:
 *  post:
 *   description: add a like to a post
 *   tags:
 *    - like
 *   produces:
 *    - application/json
 *   requestBody:
 *     description: Optional description in *Markdown*
 *     content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/like'
 *   responses:
 *      "200":
 *        description: test
 * 
 */


Router.post("/", [authJwt.verifyToken, core.validator(schemas.like.post, 'body')], core.controller.like.add);
Router.get("/", [authJwt.verifyToken], core.controller.like.get);
Router.get("/:likeId", [authJwt.verifyToken, core.validator(schemas.like.getById, 'params')], core.controller.like.get);
Router.delete("/:likeId", [
    authJwt.verifyToken,
    core.validator(schemas.like.getById, 'params'),
  ],
  core.controller.like.delete);

exports.router = Router;
exports.path = 'like'