const User = require('./User.js');
const Competition = require('./Competition.js');
const Scoreboard = require('./Scoreboard.js');

User.hasMany(Competition, {
  foreignKey: 'owner',
  onDelete: 'CASCADE'
});

Competition.belongsTo(User, {
  foreignKey: 'owner'
});

User.hasMany(Scoreboard, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
Scoreboard.belongsTo(User, {
    foreignKey: 'user_id'
  });

Competition.hasMany(Scoreboard, {
    foreignKey: 'competition_id',
    onDelete: 'CASCADE'
});

Scoreboard.belongsTo(Competition, {
    foreignKey: 'competition_id'
  });



module.exports = { User, Competition, Scoreboard };
