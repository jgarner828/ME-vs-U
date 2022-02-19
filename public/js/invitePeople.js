

const getUsers = async function() {
    
fetch('/api/users/all')
  .then(response => response.json())
  .then( (data) => {
      console.log(data);
  });
}