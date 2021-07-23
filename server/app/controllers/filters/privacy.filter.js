let core = require('../../../core.js')
const Op = core.db.Sequelize.Op;
let db = core.db;
module.exports = (req, userScope, followersScope, scope) => {
    let tempSQL = db.sequelize.queryInterface.QueryGenerator.selectQuery('followers', {
        attributes: ['followedId'],
        where: {
          unfollowDate: null,
          userId: req.userId
        }
      }).slice(0, -1); // to remove the ';' from the end of the SQL
    return {
        [Op.or]: [
            //user posts
            {
              userId: req.userId,
              scopeId: {
                [Op.in]: userScope
              }
            },
            //followers posts
            {
              userId: {
                [Op.in]: db.sequelize.literal(`(${tempSQL})`)
              },
              scopeId: {
                [Op.in]: followersScope
              }
            },// a public post from not followed user
             {
                ...(scope && {scopeId: scope})
            }
          ]
    }
}