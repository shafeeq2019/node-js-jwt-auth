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

db.user.belongsToMany(db.post, {
  through: "user_posts",
  foreignKey: "userId",
  otherKey: "postId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
