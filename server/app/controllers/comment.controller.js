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
    let updatedComment = await db.comment.update({
      comment: req.body.comment
    }, {
      where: {
        id: req.params.id,
        userId: req.userId
      },
      returning: true
    });
    res.status(200).send(updatedComment[1])
  } catch (e) {
    res.status(404).send(e.message);
  }
}

exports.getByPostId = async (req, res, next) => {
  try {
    let comments = await db.comment.findAll({
      where: {
        postId: req.params.id,
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

exports.get = async (req, res, next) => {
  try {
    let comments = await db.comment.findAll({
      where: {
        id: req.params.id,
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

exports.delete = async (req, res, next) => {

}





