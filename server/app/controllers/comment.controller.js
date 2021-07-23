let core = require('../../core.js')
let db = core.db;
const api = require('../controllers/api.controller.js')
const Op = core.db.Sequelize.Op;
let controller = require('./index');
const privacyFilter = controller.filter.privacy;



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


exports.getComment = async (req, res, next) => {
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
      },
    ], req.query);

    let posts = await db.comment.findAndCountAll({
      limit,
      offset,
      attributes: {
        exclude: ["isDeleted","userId"]
      },
      where: {
        ...(req.params.commentId && {id: req.params.commentId}),
        ...queryFilter,
        isDeleted: false
      },
      include: [{
        attributes: [],
        model: core.db.post,
        where: {
          ...(req.params.postId && {id: req.params.postId}),
          ...privacyFilter(req,[1,2,3],[1,2],[1]),
          isDeleted: false
        }
      },
      {
        model: core.db.user,
        attributes: ["username", "email"]
      }
    ]
    })
    res.status(200).send(api.getPagingData(posts, page, limit));
  } catch (error) {
    console.log(error.message)
    res.status(404).send(error.message);
  }
}

exports.delete = async (req, res, next) => {

}