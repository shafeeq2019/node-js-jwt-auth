

let core = require('../../core.js')
let db = core.db;


exports.add = async (req, res, next) => {
  try {
    let newComment = await db.comment.create({
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

exports.update = async (req, res, next) => {
  try {
    let updatedComment = db.comment.update({
      comment: req.body.comment
    }, {
      where: {
        id: req.body.commentId,
        userId: req.userId
      }
    });
    res.status(200).send(updatedComment)
  } catch (e) {
    res.status(404).send(e.message);
  }
}

exports.get = async (req, res, next) => {
  try {
    let comments = await db.comment.findAll({
      where: {
        postId: req.body.postId,
        isDeleted: false
      },
      order: [
        ['createdAt', 'DESC']
      ],
      attributes: {
        exclude: ["isDeleted"]
      },
      include:[
        {model: db.user
        ,attributes: ["id","username", "email"]}
      ]
    })
    res.status(200).send(comments)
  } catch (e) {
    res.status(404).send(e.message);
  }
}
