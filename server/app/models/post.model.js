module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    text: {
      type: Sequelize.STRING(10000),
      allowNull: false
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  return Post;
};
