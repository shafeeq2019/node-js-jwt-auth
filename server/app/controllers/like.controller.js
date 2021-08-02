let core = require('../../core.js')
let db = core.db;
const api = require('../controllers/api.controller.js')
const Op = core.db.Sequelize.Op;
let controller = require('./index');
const privacyFilter = controller.filter.privacy;


exports.add = async (req, res, next) => {
  try {
    let post = await db.post.findOne({
      where: {
        id: req.body.postId || req.params.postId,
        isDeleted: false,
        ...privacyFilter(req, [1, 2, 3], [1, 2], [1]),
      }
    });

    if (!post) {
      return res.status(404).send(core.controller.api.createErrorMessage(`no post found !`));
    }
      let newLike = await db.like.create({
        postId: req.params.postId || req.body.postId,
        userId: req.userId
      });
      res.status(200).send(newLike)

  } catch (error) {
    if ((error.message.includes("doppelter Schlüsselwert"))) {
      res.status(404).send(core.controller.api.createErrorMessage("you already liked this post !"));
    } else {
      res.status(404).send(core.controller.api.createErrorMessage(error.message));
    }

  }
}

exports.get = async (req, res, next) => {
  try {
    const {
      page,
      size
    } = req.query;
    const {
      limit,
      offset
    } = api.getPagination(page, size);

    let likes = await db.like.findAndCountAll({
      limit,
      offset,
      attributes: {
        //exclude: ["isDeleted","userId"]
      },
      where: {
        ...(req.params.likeId && {id: req.params.likeId}),
      },
      include: [{
          attributes: [],
          model: core.db.post,
          where: {
            ...(req.params.postId && {
              id: req.params.postId
            }),
            ...privacyFilter(req, [1, 2, 3], [1, 2], [1])
          }
        },
        {
          model: core.db.user,
          attributes: ["username"]
        }
      ]
    })
    res.status(200).send(api.getPagingData(likes, page, limit));
  } catch (error) {
    res.status(404).send(core.controller.api.createErrorMessage(error.message));
  }
}


exports.delete = (req, res, next) => {
  
}