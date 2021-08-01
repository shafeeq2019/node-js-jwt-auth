let core = require('../../core.js')
let db = core.db;
const api = require('../controllers/api.controller.js')
const Op = core.db.Sequelize.Op;
let controller = require('./index');
const privacyFilter = controller.filter.privacy;


exports.add = async (req, res, next) => {
  try {
    let like = await db.like.findOne({
      where: {
        postId: req.params.postId,
        userId: req.userId
      }
    });
    if (!like) {
      let newLike = await db.like.create({
        postId: req.params.postId,
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
      },
    ], req.query);

    let likes = await db.like.findAndCountAll({
      limit,
      offset,
      attributes: {
        //exclude: ["isDeleted","userId"]
      },
      where: {
        //...(req.params.likeId && {id: req.params.commentId}),
        ...queryFilter
      },
      include: [{
        attributes: [],
        model: core.db.post,
        where: {
          ...(req.params.postId && {id: req.params.postId}),
          ...privacyFilter(req,[1,2,3],[1,2],[1])
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
    console.log(error.message)
    res.status(404).send(error.message);
  }
}