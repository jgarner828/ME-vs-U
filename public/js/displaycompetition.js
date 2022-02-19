// const { init } = require("../../models/User");
let scoreList = document.getElementById('score-list');
//let scoreboard = document.getElementById('scorboard');
let userScores =[];
let users = [];


const init = function() {


for(let i=0; i<scoreList.children.length;i++){
 let x = i-1;
  if(i==0){
    userScores.push(scoreList.children[i].getAttribute('data-score'));
    users.push(scoreList.children[i].getAttribute('data-userid'));

  }
  else if(scoreList.children[i].getAttribute('data-score')>userScores[x]){
    userScores.push(userScores[x]);
    users.push(users[x]);
    userScores[x]=scoreList.children[i].getAttribute('data-score');
    users[x]=scoreList.children[i].getAttribute('data-userid');
  }
  else if(scoreList.children[i].getAttribute('data-score')<userScores[x]) {
    userScores.push(scoreList.children[i].getAttribute('data-score'));
    users.push(scoreList.children[i].getAttribute('data-userid'));
  }
  else{
    return;
  }
};
console.log(users);
console.log(userScores);
for(i=users.length-1; i>-1;i--){
  let li = document.createElement("li");

  let userID = users[i];
  let score = userScores[i];
  console.log(score);


  var scoreText = document.createElement('p'); 
  scoreText.innerHTML = `${userID} has a score of ${score}`;

  li.appendChild(scoreText);
  document.getElementById('scoreboard').appendChild(li);

};



};

const updateCompetition = async function() {

  const quantity = document.getAttribute('data-quantity');
  const scoreboardId = document.getAttribute('data-scoreboard');

  console.log(quantity);
  console.log(scoreboardId);

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
 