 const url= window.location.href;
// const users=[];
// console.log(comp_id);

const getUsers = async  function(event) {

    event.preventDefault();
    console.log('in getUsers function')
  
    let users = document.querySelectorAll('.username');
    let usernameArray = Array.from(users)
    let usernames = []
    usernameArray.forEach(user => {
      usernames.push(user.label)
    })
  
    console.log(usernames)
    // users contains an array of all users.

    let competition_id = 1;

    fetch('/api/scoreboard/add', {
      method: 'POST',
      body: JSON.stringify({ usernames, competition_id }),
      headers: { 'Content-Type': 'application/json' },
    });
};
 


  document
  .querySelector("#addUsers")
  .addEventListener("click", getUsers);




