const { authJwt } = require("../middleware");
const controller = require("../controllers/post.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/post/getPosts",
    [authJwt.verifyToken],
    controller.getUserPosts
  );

  app.post(
    "/api/post/addPost",
    [authJwt.verifyToken],
    controller.addPost
  );


  app.post("/api/post/like", [authJwt.verifyToken], controller.postLikeToPost)
};
