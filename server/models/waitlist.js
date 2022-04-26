module.exports = (sequelize, Sequelize) => {
    const WaitList = sequelize.define("waitlist", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      address: {
        type: Sequelize.STRING,
        unique: true,
      },
      twitter_name: {
        type: Sequelize.STRING,
        unique: true,
      },
      discord_name: {
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
      }
    });
  
    return WaitList;
  };