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

    let newComment = await db.comment.create({
      userId: req.userId,
      comment: req.body.comment,
      postId: req.params.postId || req.body.postId
    });
    res.status(200).send(newComment)
  } catch (error) {
    core.logger.error(error.message)
    res.status(404).send(core.controller.api.createErrorMessage(error.message));
  }
}

exports.update = async (req, res, next) => {
  try {
    let updatedComment = await db.comment.update({
      comment: req.body.comment
    }, {
      where: {
        id: req.params.commentId,
        userId: req.userId,
        isDeleted: false
      },
      returning: true
    });
    core.controller.api.sendUpdateMessage(res, updatedComment)
  } catch (e) {
    res.status(404).send(core.controller.api.createErrorMessage(e.message));
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

    var queryFilter = api.getFilterCondition([{
      field: 'comment',
      type: 'string'
    }, ], req.query);

    let comments = await db.comment.findAndCountAll({
      limit,
      offset,
      attributes: {
        exclude: ["isDeleted", "userId"]
      },
      where: {
        ...(req.params.commentId && {
          id: req.params.commentId
        }),
        ...queryFilter,
        isDeleted: false
      },
      include: [{
          attributes: [],
          model: core.db.post,
          where: {
            ...(req.params.postId && {
              id: req.params.postId
            }),
            ...privacyFilter(req, [1, 2, 3], [1, 2], [1]),
            isDeleted: false
          }
        },
        {
          model: core.db.user,
          attributes: ["username", "email"]
        }
      ]
    })
    res.status(200).send(api.getPagingData(comments, page, limit));
  } catch (error) {
    res.status(404).send(core.controller.api.createErrorMessage(error.message));
  }
}

exports.delete = async (req, res, next) => {
  try {
    let post = await db.comment.findOne({
      where: {
        id: req.params.commentId,
        userId: req.userId,
        isDeleted: false
      }
    });
    if (!post) {
      return res.status(404).send(core.controller.api.createErrorMessage(`no comment with id ${req.params.commentId} found !`));
    }
    post.update({
      isDeleted: true
    })
    res.status(200).send({
      message: `comment with id ${req.params.commentId} is deleted !`
    });
  } catch (error) {
    res.status(404).send(core.controller.api.createErrorMessage(error.message));
  }
}