 //const { isActive } = require("../../utils/helpers");

// const { init } = require("../../models/User");
let scoreList = document.getElementById('score-list');
let timeRemaining = document.getElementById('timeRemaining');
let comp_id = document.getElementById('comp_id');
let competition_id= comp_id.getAttribute('data-competition_id');
let userScores =[];
let users = [];


const init = function() {


for(i=0; i<scoreList.children.length;i++){
  userScores.push(scoreList.children[i].getAttribute('data-score'));
  users.push(scoreList.children[i].getAttribute('data-userid'));

};

for(i=1; i<users.length;i++){

  for(x=0; x<i; x++){
  if(parseInt(userScores[i])>parseInt(userScores[x])){
    let value1=userScores[x];
    let value2=userScores[i];
    let value3=users[x];
    let value4=users[i];
    userScores[x]=value2;
    userScores[i]=value1;
    users[x]=value4;
    users[i]=value3;
  }
};
};

for(i=0; i<users.length;i++){
  let li = document.createElement("li");

  let userID = users[i];
  let score = userScores[i];
  console.log(score);


  var scoreText = document.createElement('p'); 
  scoreText.innerHTML = `${userID} has a score of ${score}`;

  li.appendChild(scoreText);
  document.getElementById('scoreboard').appendChild(li);

};

isActive();
console.log(isActive());

};

const isActive = function() {
  timeLeft = timeRemaining.getAttribute('data-time');
     
  if(timeLeft==0){
    updateWinner();  
    return false;
     
  }
  else{ return true;
  };

};

const updateWinner = async function() {
const winner = users[0];
console.log(winner);
  const response = await fetch(`/api/competition/winner/${competition_id}`, {
    method: 'PUT',
    body: JSON.stringify({winner}),
    headers: {
      'Content-Type': 'application/json',
    },
});
if (response.ok) {
  var winnerText = document.createElement('h3'); 
  winnerText.innerHTML = `${winner} won the competition!!`;
  document.getElementById('score-list').appendChild(winnerText);
    return;
  } else {
    alert('Failed to update competition');
  };

};

const updateCompetition = async function() {

  const quantity = document.getAttribute('data-quantity');
  const scoreboardId = document.getAttribute('data-scoreboard');



    // if (updateValue) {
    //     // Send a POST request to the API endpoint
    //     const response = await fetch('/api/scoreboard/updatescore', {
    //       method: 'POST',
    //       body: JSON.stringify({ updateValue }),
    //       headers: { 'Content-Type': 'application/json' },
    //     });
    
    //     if (response.ok) {
    //       // If successful, redirect the browser to the blog posts
    //       document.location.replace('/dashboard');
    //       console.log("successful update");
    //     } else {
    //       alert(response.statusText);
    //       console.log("unsuccessful update");
    //     }
    //   }
};

init();

document.querySelector('#update-btn').addEventListener('click', updateCompetition);
 