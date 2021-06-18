let core = require('../../core.js')
let db = core.db;

exports.add = async (req, res, next) => {
  try {
    let like = await db.like.findOne({
      where: {
        postId: req.body.postId,
        userId: req.userId
      }
    });
    if (!like) {
      let newLike = await db.like.create({
        postId: req.body.postId,
        userId: req.userId
      });
      res.status(200).send(newLike)
    } else {
      like.destroy();
      res.status(200).send({
        message: `Like reomoved`
      });
    }
  } catch (error) {
    res.send(error.message);
  }
}
