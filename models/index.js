const cFonts = require("cfonts");
const User = require("./User.js");
const Competition = require("./Competition.js");
const Scoreboard = require("./Scoreboard.js");

function init() {
  cFonts.say("Me  vs   U", {
    font: "3d", // define the font face
    align: "left", // define text alignment
    colors: ["red"], // define all colors
    background: "transparent", // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1, // define letter spacing
    lineHeight: 1, // define the line height
    space: true, // define if the output text should have empty lines on top and on the bottom
    maxLength: "0", // define how many character can be on one line
    gradient: false, // define your two gradient colors
    independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: false, // define if this is a transition between colors directly
    env: "node", // define the environment CFonts is being executed in
  });

  main();
}
init();

User.hasMany(Competition, {
  foreignKey: "owner",
  onDelete: "CASCADE",
});

Competition.belongsTo(User, {
  foreignKey: "owner",
});

User.hasMany(Scoreboard, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Scoreboard.belongsTo(User, {
  foreignKey: "user_id",
});

Competition.hasMany(Scoreboard, {
  foreignKey: "competition_id",
  onDelete: "CASCADE",
});

Scoreboard.belongsTo(Competition, {
  foreignKey: "competition_id",
});

module.exports = { User, Competition, Scoreboard };
