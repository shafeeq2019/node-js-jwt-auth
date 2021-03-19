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

exports.getUserPosts = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      let userId = user.id
      user.getPosts().then(posts => {
        res.send(posts);
      });
    });
}

exports.addPost = async (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then( async (user) => {
    let post = await Post.create({text: "test"});
    console.log(post)
  }
  )
}
