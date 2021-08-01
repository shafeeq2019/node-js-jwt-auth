const {
  authJwt
} = require("../middleware");
const core = require('../../core.js');
var express = require('express');
var Router = express.Router();

Router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});


/**
 * @swagger
 * /comment/add:
 *  post:
 *   description: add a new comment
 *   tags:
 *    - comment
 *   produces:
 *    - application/json
 *   requestBody:
 *     description: Optional description in *Markdown*
 *     content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/comment'
 *   responses:
 *      "200":
 *        description: test
 * 
 */
Router.post("/",
  [authJwt.verifyToken,
    core.validator(core.schemas.comment.post, 'body')
  ],
  core.controller.comment.add);


Router.get("/", [authJwt.verifyToken], core.controller.comment.get);

Router.get("/:commentId", [
    authJwt.verifyToken,
    core.validator(core.schemas.comment.getById, 'params')
  ],
  core.controller.comment.get);

Router.put("/:commentId", [
    authJwt.verifyToken,
    core.validator(core.schemas.comment.getById, 'params'),
    core.validator(core.schemas.comment.put, 'body')
  ],
  core.controller.comment.update);


Router.delete(
  "/:commentId", [
    authJwt.verifyToken,
    core.validator(core.schemas.comment.getById, 'params'),
  ],
  core.controller.comment.delete
);


exports.router = Router;
exports.path = 'comment';