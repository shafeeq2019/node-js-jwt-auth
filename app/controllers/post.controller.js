const db = require("../models");

const User = db.user;
const Role = db.role;
const Post = db.post;
const Like = db.like;


exports.postLikeToPost = async (req, res, next) => {
  const postId = req.body.postId;
  const userId = req.userId;
  let user = await User.findOne({
    where: {
      id: req.userId
    }
  });
  if (!user) {
    return res.status(404).send({
      message: "User Not found."
    });
  }
  let post = await Post.findOne({
    where: {
      id: postId
    }
  });
  if (!post) {
    return res.status(404).send({
      message: "Post Not found."
    });
  }
  let like = await Like.findOne({
    where: {
      postId: post.id,
      userId: user.id
    }
  });
  if (!like) {
    let newLike = await user.createLike({
      postId: post.id
    });
    res.status(200).send(newLike)
  } else {
    like.destroy();
    res.status(200).send({
      message: `Like reomoved`
    });
  }
}

exports.getUserPosts = async (req, res, next) => {
  try {
    let posts = await Post.findAll({
      where: {
        userId: req.userId
      }
    })
    res.status(200).send(posts);
  } catch (error) {
    res.status(404).send(error);
  }
}

exports.addPost = async (req, res, next) => {
  try {
    let post = await Post.create({
      userId: req.userId,
      text: req.body.post
    });
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send(error);
  }

}
