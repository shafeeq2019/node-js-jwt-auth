let core = require('../../core.js')
let db = core.db;
const api = core.controller.api;
const Op = core.db.Sequelize.Op;

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
      include: [{
        model: db.user,
        attributes: ["id", "username", "email"]
      }]
    })
    res.status(200).send(comments)
  } catch (e) {
    res.status(404).send(e.message);
  }
}

let attributes = {

}



exports.getComment = async (req, res, next) => {
  let idFilter = {};
  let postIdFilter = {};
  if (req.params.commentId) {
    idFilter = {
      id: req.params.commentId
    }
  }
  if (req.params.postId) {
    postIdFilter = {
      id: req.params.postId
    }
  }
  try {
    const {
      page,
      size,
      text,
      userId
    } = req.query;
    const {
      limit,
      offset
    } = api.getPagination(page, size);

    var queryFilter = api.getFilterCondition([{
        field: 'comment',
        type: 'string'
      },
      {
        field: 'id',
        type: 'integer'
      },
      {
        field: 'userId',
        type: 'integer'
      }
    ], req.query);

    let tempSQL = db.sequelize.queryInterface.QueryGenerator.selectQuery('followers', {
      attributes: ['followedId'],
      where: {
        unfollowDate: null,
        userId: req.userId
      }
    }).slice(0, -1); // to remove the ';' from the end of the SQL

    let posts = await db.comment.findAndCountAll({
      limit,
      offset,
      where: {
        ...idFilter,
        ...queryFilter,
        isDeleted: false
      },
      include: [{
        model: core.db.post,
        attributes: ["id"],
        where: {
          ...postIdFilter,
          [Op.or]: [{
              userId: req.userId,
              scopeId: {
                [Op.in]: [1, 2, 3]
              }
            },
            {
              userId: {
                [Op.in]: db.sequelize.literal(`(${tempSQL})`)
              },
              scopeId: {
                [Op.in]: [1,2]
              }
            }
          ],
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