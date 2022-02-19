 //const { isActive } = require("../../utils/helpers");

// const { init } = require("../../models/User");
let scoreList = document.getElementById('score-list');
let timeRemaining = document.getElementById('timeRemaining');
let comp_id = document.getElementById('comp_id');
let updateBtn = document.getElementById('update-btn');
let competition_id= comp_id.getAttribute('data-competition_id');
let quantity = updateBtn.getAttribute('data-quantity');

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
  let row =  document.createElement("tr");
  let th = document.createElement("th");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");

  let userID = users[i];
  let score = userScores[i];

  row.setAttribute('scope','row');
  th.innerHTML = i+1;
  td1.innerHTML = `${userID}`;
  td2.innerHTML = `${score}`;

  row.appendChild(th);
  row.appendChild(td1);
  row.appendChild(td2);

  document.getElementById('scoreboard').appendChild(row);

};

isActive();


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

  const response = await fetch(`/api/competitions/winner/${competition_id}`, {
    method: 'PUT',
    body: JSON.stringify({winner}),
    headers: {
      'Content-Type': 'application/json',
    },
});
if (response.ok) {

  let td = document.getElementById("winner");
  td.innerHTML = `${winner}`;

    return;
  } else {
    alert('Failed to update competition');
  };

};

const updateCompetition = async function() {



        // Send a POST request to the API endpoint
        const response = await fetch('/api/scoreboard/updatescore', {
          method: 'PUT',
          body: JSON.stringify({quantity, competition_id }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          // If successful, redirect the browser to the blog posts
          //document.location.replace(`/api/competitions/${competition_id}`);
          console.log("successful update");
        } else {
          alert(response.statusText);
          console.log("unsuccessful update");
        }
      };
// };

init();

document.querySelector('#update-btn').addEventListener('click', updateCompetition);
 