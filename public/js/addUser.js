const createUser = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const newUsername = document.querySelector('#newUsername').value.trim();
    const newEmail = document.querySelector('#newEmail').value.trim();
    const newPassword = document.querySelector('#newPassword').value.trim();
    const newPassword2 = document.querySelector('#newPassword2').value.trim();
    
    console.log(newEmail);
    console.log(newPassword);

    if (newUsername && newEmail && newPassword == newPassword2 ) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/adduser', {
        method: 'POST',
        body: JSON.stringify({ newUsername, newEmail, newPassword,  }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the blog posts
        document.location.replace('/dashboard');
        console.log("successfully created user");
      } else {
        alert(response.statusText);
        console.log("unsuccessful created user");
      }
    }
  };
  

document
.querySelector('#createUserbutton')
.addEventListener('click', createUser);