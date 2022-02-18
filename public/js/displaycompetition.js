
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

  

document.querySelector('.update-btn').addEventListener('click', updateCompetition);
 