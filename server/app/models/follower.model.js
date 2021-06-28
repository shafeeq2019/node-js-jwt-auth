module.exports = (sequelize, Sequelize) => {
    const Follower = sequelize.define("followers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      unfollowDate: Sequelize.DATE
    }
    );
  
    return Follower;
  };
  
  