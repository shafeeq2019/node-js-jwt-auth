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
Router.post("/", [authJwt.verifyToken], controller.add);
Router.get("/:id", [authJwt.verifyToken], controller.get);
Router.get("/getByPostId/:id", [authJwt.verifyToken], controller.getByPostId);
Router.put("/:id", [authJwt.verifyToken], controller.update);
Router.delete("/:id", [authJwt.verifyToken], controller.delete);

exports.router = Router;
exports.path = 'comment'