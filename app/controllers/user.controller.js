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

exports.getUserPosts = async (req, res, next) => {
  let user = await User.findOne({ where: { id: req.userId } });
  user.getPosts().then(posts => {
    res.send(posts);
  });
}

exports.addPost = async (req, res, next) => {
  let user = await User.findOne({ where: { id: req.userId } });
  let post = await Post.create({text: req.body.post});
  let addPost = await user.addPost(post);
  res.status(200).send("ok");
}
