const db = require("../models");

const User = db.user;
const Role = db.role;
const Token = db.token;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const crypto = require("crypto");
const moment = require("moment");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, global.gConfig.auth.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.forgotPassword = async function(req, res) {
  let user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }
  let token = await Token.findOne({ where: { userId: user.id } });
  if (token) {
    await token.destroy();
  }
  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number("bcryptSalt"));
  let newToken = await Token.create({token: hash});
  await user.setToken(newToken);
  const link = `localhost:8081/api/auth/passwordReset?token=${resetToken}&id=${user.id}`;
  res.send(link) ;
};

exports.resetPassword = async function(req, res) {
  let {userId, token, password} = req.body;
  let passwordResetToken = await Token.findOne({ where: { userId: userId } });
   if (!passwordResetToken || moment(passwordResetToken.tokenExpires).isBefore(moment.now())) {
     res.status(500).send({ message: "Invalid or expired password reset token" });
     return;
   }
   const isValid = await bcrypt.compare(token, passwordResetToken.token);
   if (!isValid) {
     res.status(500).send({ message: "Invalid or expired password reset token" });
     return;
   }
   const hash = await bcrypt.hash(password, Number("bcryptSalt"));
   let user = await User.findOne({ where: { id: userId } });
   user.password = bcrypt.hashSync(password, 8);
   await user.save();
   await passwordResetToken.destroy();
   res.send(user);
}
