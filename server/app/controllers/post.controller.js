let core = require('../../core.js')
let db = core.db;
const sequelize = require("sequelize");
const Op = core.db.Sequelize.Op;

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
  console.log(req.body)
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
    } = core.controller.api.getPagination(page, size);

    var condition = core.controller.api.getFilterCondition([{
        field: 'text',
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

    let posts = await db.post.findAndCountAll({
      limit,
      offset,
      where: {
        ...condition,
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
              [Op.in]: [2]
            }
          }
        ],
        isDeleted: false
      },
      ...attributes
    })
    res.status(200).send(core.controller.api.getPagingData(posts, page, limit));
  } catch (error) {
    console.log(error.message)
    res.status(404).send(error.message);
  }
}




exports.getPost = async (req, res, next) => {
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
    } = core.controller.api.getPagination(page, size);

    var condition = core.controller.api.getFilterCondition([{
        field: 'text',
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

    let posts = await db.post.findAndCountAll({
      limit,
      offset,
      where: {
        ...condition,
        [Op.or]: [
          //user posts
          {
            userId: req.userId,
            scopeId: {
              [Op.in]: [1, 2, 3]
            }
          },
          //followers posts
          {
            userId: {
              [Op.in]: db.sequelize.literal(`(${tempSQL})`)
            },
            scopeId: {
              [Op.in]: [1, 2]
            }
          },// a public post from not followed user
           {
            scopeId: 1
          }
        ],
        isDeleted: false
      },
      ...attributes
    })
    res.status(200).send(core.controller.api.getPagingData(posts, page, limit));
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