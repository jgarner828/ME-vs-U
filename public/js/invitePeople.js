 const url= window.location.href;
// const users=[];
// console.log(comp_id);

const getUsers = async  function(event) {

    event.preventDefault();
    console.log('in getUsers function')
  
    let users = document.querySelectorAll('.username');
    let usernameArray = Array.from(users)
    let usernames = []

    // pushing all checked users into the usernames array. need to pull Id out for each one
    for(var user of usernameArray) {
      if(user.checked) {
          usernames.push(user)
      }
    };

    let userIds = usernames.map( user => {
      return user.id;
    })


    fetch('/api/scoreboard/add', {
      method: 'POST',
      body: JSON.stringify({ userIds }),
      headers: { 'Content-Type': 'application/json' },
    });
    document.location.replace(`/dashboard`);
};
 


  document
  .querySelector("#addUsers")
  .addEventListener("click", getUsers);



