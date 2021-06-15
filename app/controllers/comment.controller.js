

const db = require("../models");
const User = db.user;
const Role = db.role;
const Post = db.post;
const Like = db.like;
const Comment = db.comment;

exports.postComment = async (req, res, next) => {
  // const postId = req.body.postId;
  // const userId = req.userId;
  // const comment = req.body.comment;
  // let user = await User.findOne({
  //   where: {
  //     id: req.userId
  //   }
  // });
  // if (!user) {
  //   return res.status(404).send({
  //     message: "User Not found."
  //   });
  // }
  // let post = await Post.findOne({
  //   where: {
  //     id: postId
  //   }
  // });
  // if (!post) {
  //   return res.status(404).send({
  //     message: "Post Not found."
  //   });
  // }
  try {
    let newComment = await Comment.create({
      userId: req.userId,
      comment: req.body.comment,
      postId: req.body.postId
    });
    res.status(200).send(newComment)
  } catch (error) {
    console.log(error.message)
    res.status(404).send(error.message);
  }
}

exports.updateComment = async (req, res, next) => {
  const commentId = req.body.commentId;
  const userId = req.userId;
  const newComment = req.body.comment;
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
  let comment = await Comment.findOne({
    where: {
      id: commentId
    }
  });
  if (!comment) {
    return res.status(404).send({
      message: "Comment Not found."
    });
  }
  try {
    comment.comment = newComment;
    let updateComment = await comment.save();
    res.status(200).send(updateComment)
  } catch (e) {
    return res.status(404).send(e);
  }
}
