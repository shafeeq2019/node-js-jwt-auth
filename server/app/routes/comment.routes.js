const {
  authJwt
} = require("../middleware");
const controller = require("../controllers/comment.controller");
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
Router.post("/add", [authJwt.verifyToken], controller.add);

Router.post("/get", [authJwt.verifyToken], controller.get);

Router.post("/update", [authJwt.verifyToken], controller.update);

exports.router = Router;
exports.path = 'comment'