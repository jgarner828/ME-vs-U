const sequelize = require('../config/connection');
const {User, Competition, Scoreboard  } = require('../models');

const userData = require('./userData.json');
const competitionData = require('./competitionData.json');
const scoreboardData = require('./scoreboardData.json');

const competitions =[];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const competition of competitionData) {
    competitions.push(await Competition.create({
     ...competition,
     owner: users[Math.floor(Math.random() * users.length)].id,
   }));
 }

  for (const scoreboard of scoreboardData) {
     await Scoreboard.create({
      ...scoreboard,
    });
  }


  process.exit(0);
};

seedDatabase();
