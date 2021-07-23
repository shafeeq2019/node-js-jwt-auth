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
Router.post("/", [authJwt.verifyToken], core.controller.comment.add);
Router.get("/", [authJwt.verifyToken], core.controller.comment.getComment);
Router.get("/:commentId", [authJwt.verifyToken], core.controller.comment.getComment);
// t
Router.put("/:id", [authJwt.verifyToken], core.controller.comment.update);
Router.delete("/:id", [authJwt.verifyToken], core.controller.comment.delete);

exports.router = Router;
exports.path = 'comment'