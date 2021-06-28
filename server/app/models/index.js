const config = require('../Config/config.js');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  global.gConfig.DBConfig.DB,
  global.gConfig.DBConfig.USER,
  global.gConfig.DBConfig.PASSWORD,
  {
    host: global.gConfig.DBConfig.HOST,
    dialect: global.gConfig.DBConfig.dialect,
    pool: {
      max: global.gConfig.DBConfig.pool.max,
      min: global.gConfig.DBConfig.pool.min,
      acquire: global.gConfig.DBConfig.pool.acquire,
      idle: global.gConfig.DBConfig.pool.idle
    }
  }
);



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.post = require("../models/post.model.js")(sequelize, Sequelize);
db.token = require("../models/token.model.js")(sequelize, Sequelize);
db.like = require("../models/like.model.js")(sequelize, Sequelize)
db.comment = require("../models/comment.model.js")(sequelize, Sequelize)
db.scope = require("../models/scope.model.js")(sequelize, Sequelize)
db.follower = require("../models/follower.model.js")(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.user.hasMany(db.post);
db.post.belongsTo(db.user);

db.user.hasOne(db.token);
db.token.belongsTo(db.user);

db.user.hasMany(db.like);
db.like.belongsTo(db.user);

db.post.hasMany(db.like);
db.like.belongsTo(db.post);

//comments
db.post.hasMany(db.comment,  { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.comment.belongsTo(db.post,  { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.user.hasMany(db.comment);
db.comment.belongsTo(db.user)

db.scope.hasOne(db.post, { foreignKey: { allowNull: false }});
db.post.belongsTo(db.scope, { foreignKey: { allowNull: false }});

//follower

//db.user.hasMany(db.follower);
db.follower.belongsTo(db.user, { as: 'followed', foreignKey: {field: 'followedId', allowNull: false}});
db.follower.belongsTo(db.user, { as: 'follower', foreignKey: {field: 'followerId', allowNull: false}});


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

