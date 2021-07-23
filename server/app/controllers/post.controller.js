let core = require('../../core.js')
let db = core.db;
const sequelize = require("sequelize");
const Op = core.db.Sequelize.Op;
const api = require('../controllers/api.controller.js')
let controller = require('./index');
const privacyFilter = controller.filter.privacy;

/*
TO DO : 
- except the private posts from the get requests
- show post with scopeId 2 only to the followers 
 */

let attributes = {
  order: [
    ['createdAt', 'DESC']
  ],
  attributes: {
    exclude: ["isDeleted", "password", "userId"]
  },
  include: [{
    model: core.db.user,
    attributes: ["id", "username", "email"]
  }, {
    model: core.db.like,
    attributes: ["userId"],
    include: [{
      model: core.db.user,
      attributes: ["username", "email"]
    }]
  }]
}



exports.getFollowersPosts = async (req, res, next) => {
  try {
    const {
      page,
      size,
      text,
      id,
      userId
    } = req.query;
    const {
      limit,
      offset
    } = api.getPagination(page, size);

    var queryFilter = api.getFilterCondition([{
        field: 'text',
        type: 'string'
      },
      {
        field: 'userId',
        type: 'integer'
      }
    ], req.query);


    let posts = await db.post.findAndCountAll({
      limit,
      offset,
      where: {
        ...queryFilter,
        ...privacyFilter(req, [1, 2, 3], [2]),
        isDeleted: false
      },
      ...attributes
    })
    res.status(200).send(api.getPagingData(posts, page, limit));
  } catch (error) {
    console.log(error)
    res.status(404).send(error.message);
  }
}



exports.getPost = async (req, res, next) => {
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
        field: 'text',
        type: 'string'
      },
      {
        field: 'userId',
        type: 'integer'
      }
    ], req.query);

    let posts = await db.post.findAndCountAll({
      limit,
      offset,
      where: {
        ...privacyFilter(req, [1, 2, 3], [1, 2], [1]),
        ...(req.params.postId && {
          id: req.params.postId
        }),
        ...(req.params.userId && {
          userId: req.params.userId
        }),
        ...queryFilter,
        isDeleted: false
      },
      ...attributes
    })
    res.status(200).send(api.getPagingData(posts, page, limit));
  } catch (error) {
    console.log(error.message)
    res.status(404).send(error.message);
  }
}


exports.add = async (req, res, next) => {
  try {
    let scope;
    !req.body.scope ? scope = 1 : scope = req.body.scope;
    let post = await db.post.create({
      userId: req.userId,
      text: req.body.post,
      scopeId: scope
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
        id: req.params.id,
        userId: req.userId,
        isDeleted: false
      }
    });
    if (!post) {
      res.status(404).send(`no post with id ${req.params.id} found !`);
    }
    post.update({
      isDeleted: true
    })
    res.status(200).send(`post with id ${req.params.id} is deleted !`);
  } catch (error) {
    res.status(404).send(error.message);
  }
}