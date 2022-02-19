const getUsers =  function(event) {
  event.preventDefault();

    
// fetch('/api/users/all')
//   .then(response => response.json())
//   .then( (data) => {
//       console.log(data);
//   });

  document
  .querySelector("#createButton")
  .addEventListener("click", getUsers);
}


console.log("helloo")

