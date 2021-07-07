let core = require('../../core.js')
let db = core.db;
const sequelize = require("sequelize");
const Op = core.db.Sequelize.Op;

/*
TO DO : 
- except the private posts from the get requests
 */
exports.get = async (req, res, next) => {
  try {
    let posts = await db.post.findAll({
      where: {
        id: req.params.id,
        //userId: req.body.userId ? req.body.userId : req.userId,
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
        model: core.db.like,
        attributes: ["userId"],
        include: [{
          model: core.db.user,
          attributes: ["username", "email"]
        }]
      }]
    })
    res.status(200).send(posts);
  } catch (error) {
    res.status(404).send(error);
  }
}

//SQL Solution - getFollowersPosts
// exports.get = async (req, res, next) => {
//   try {
//     let data = await db.sequelize.query(`
//     SELECT p.id, p.text,p."createdAt",p."updatedAt", u.username "postedBy",
//     u.id "postedById",
//     CASE
//     WHEN STRING_AGG(u2.username, ' ') IS NULL THEN NULL
//     ELSE  json_agg(json_build_object(
//             'userId', u2.id, 
//             'username', u2.username
//         ))  
//     END AS "Liked BY"
//     FROM posts p
//     LEFT JOIN users u ON u.id = p."userId"
//     LEFT JOIN likes l ON l."postId" = p.id
//     lEFT JOIN users u2 ON u2.id = l."userId"
//     WHERE p."isDeleted" = false AND 
//     (p."userId" in (SELECT "followedId" FROM followers WHERE "userId" = 1 AND "unfollowDate" IS NULL ) OR p."userId" = 1)
//     AND p."scopeId" IN (1,2)
//     GROUP BY p.id, p.text,p."createdAt",p."updatedAt", u.username ,u.id
//     `);
//     res.send(data[0])
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// }

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
        ...(req.body.id && {
          id: req.body.id
        }),
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
    let posts = await db.post.findAll({
      where: {
        isDeleted: false,
        scopeId: 1
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
    })
    res.status(200).send(posts);
  } catch (error) {
    res.status(404).send(error);
  }
}

exports.getUserPost = async (req, res, next) => {
  try {
    let posts = await db.post.findAll({
      where: {
        isDeleted: false,
        userId: req.userId
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
    })
    res.status(200).send(posts);
  } catch (error) {
    console.log(error)
    res.status(404).send(error);
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