let core = require('../../core.js')
let db = core.db;
const sequelize = require("sequelize");
const Op = core.db.Sequelize.Op;

/*
TO DO : 
- except the private posts from the get requests
- show post with scopeId 2 only to the followers 
 */
exports.getByPostId = async (req, res, next) => {
  try {
    let query = prepareQuery(req, res);
    query.where["id"] = req.params.id;
    let posts = await db.post.findAll(query)
    res.status(200).send(posts);
  } catch (error) {
    res.status(404).send(error);
  }
}


exports.getFollowersPosts = async (req, res, next) => {
  try {
    let tempSQL = db.sequelize.queryInterface.QueryGenerator.selectQuery('followers', {
      attributes: ['followedId'],
      where: {
        unfollowDate: null,
        userId: req.userId
      }
    }).slice(0, -1); // to remove the ';' from the end of the SQL

    let posts = await db.post.findAll({
      where: {
        [Op.or]: [{
            userId: req.userId
          },
          {
            userId: {
              [Op.in]: db.sequelize.literal(`(${tempSQL})`)
            }
          }
        ],
        isDeleted: false,
        scopeId: {
          [Op.or]: [1, 2]
        }
      },
      order: [
        ['createdAt', 'DESC']
      ],
      attributes: {
        exclude: ["isDeleted", "password", "userId"]
      },
      include: [{
          model: core.db.user,
          attributes: ["id", "username", "email"]
        },
        {
          model: core.db.like,
          attributes: ["userId"],
          include: [{
            model: core.db.user,
            attributes: ["username", "email"]
          }]
        }
      ]
    })
    res.status(200).send(posts);
  } catch (error) {
    console.log(error.message)
    res.status(404).send(error.message);
  }
}


exports.getAll = async (req, res, next) => {
  try {
    let query = prepareQuery(req, res);
    let posts = await db.post.findAll(query)
    res.status(200).send(posts);
  } catch (error) {
    console.log(error)
    res.status(404).send(error);
  }
}

exports.getUserPost = async (req, res, next) => {
  let query = prepareQuery(req, res);
  query.where["userId"] = req.params.id;
  try {
    let posts = await db.post.findAll(query)
    res.status(200).send(posts);
  } catch (error) {
    console.log(error)
    res.status(404).send(error);
  }
}


let prepareQuery = (req, res) => {
  let sameUser = req.userId == req.params.id;
  let tempSQL = db.sequelize.queryInterface.QueryGenerator.selectQuery('followers', {
    attributes: ['followedId'],
    where: {
      unfollowDate: null,
      userId: req.userId
    }
  }).slice(0, -1); // to remove the ';' from the end of the SQL
  return {
    where: {
      isDeleted: false,
      [Op.or]: [{
          scopeId: 1
        },
        {
          userId: req.userId
        },
        {
          userId: {
            [Op.in]: db.sequelize.literal(`(${tempSQL})`)
          }
        }
      ],
      scopeId: {
        [Op.ne]: db.sequelize.literal(`(CASE
          WHEN ${sameUser} then 0
          ELSE 3 
          END)`)
      }
    },
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