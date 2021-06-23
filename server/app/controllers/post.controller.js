let core = require('../../core.js')
let db = core.db;

exports.getUserPosts = async (req, res, next) => {
  try {
    let posts = await db.post.findAll({
      where: {
        userId: req.userId,
        isDeleted: false
      },
      attributes: {
        exclude: ["isDeleted"]
      },
      include: []
    })
    res.status(200).send(posts);
  } catch (error) {
    res.status(404).send(error);
  }
}

exports.getAll = async (req, res, next) => {
  try {
    let posts = await db.post.findAll({
      where: {
        isDeleted: false
      },
      attributes: {
        exclude: ["isDeleted", "password","userId"]
      },
      include: [{
        model: core.db.user,
        attributes:["id","username","email"]
      },{
        model: core.db.like,
        attributes:["userId"],
        include:[{
          model: core.db.user,
          attributes: ["username","email"]
        }]
      }
    ]
    })
    res.status(200).send(posts);
  } catch (error) {
    res.status(404).send(error);
  }
}

exports.add = async (req, res, next) => {
  try {
    let post = await db.post.create({
      userId: req.userId,
      text: req.body.post
    });
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send(error);
  }
}


exports.delete = async (req, res, next) => {
  try {
    let post = await db.post.findOne({
      where: {
        id: req.body.postId,
        userId: req.userId,
        isDeleted: false
      }
    });
    if (!post) {
      res.status(404).send(`no post with id ${req.body.postId} found !`);
    }
    post.update({isDeleted: true})
    res.status(200).send(`post with id ${req.body.postId} is deleted !`);
  } catch (error) {
    res.status(404).send(error.message);
  }
}
