const {
  verifySignUp
} = require("../middleware");
const controller = require("../controllers/auth.controller");
var express = require('express');
var Router = express.Router();


Router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

Router.post(
  "/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  controller.signup
);

Router.post("/signin", controller.signin);

Router.route("/forgot_password")
  .get()
  .post(controller.forgotPassword);

Router.route("/passwordReset")
  .get()
  .post(controller.resetPassword);


Router.get("/", (req, res) => {
  res.send("es hat geklappt !")
})

exports.router = Router;
exports.path = 'auth'