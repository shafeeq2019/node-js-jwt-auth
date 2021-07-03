const db = require("../models");

const User = db.user;
const Role = db.role;
const Post = db.post;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};


exports.getUserInfo = async (req, res) => {
  try {
    let user = await db.user.findOne({
      where: {
        id: req.userId
      },
      attributes: {
        exclude: ["password", "updatedAt"]
      },
      include: [{
        model: db.follower,
        attributes: ["createdAt"],
        include: [{
          model: db.user,
          as: 'followed',
          attributes: ["username", "email"]
        }]
      }]
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error);
  }

}