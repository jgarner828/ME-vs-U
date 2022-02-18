
const updateCompetition = async function() {
    const updateValue = document.querySelector('#quantity').value.trim();
    console.log('updateValue: ');
    console.log(updateValue)

    if (updateValue) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/scoreboard/updatescore', {
          method: 'POST',
          body: JSON.stringify({ updateValue }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          // If successful, redirect the browser to the blog posts
          document.location.replace('/dashboard');
          console.log("successful update");
        } else {
          alert(response.statusText);
          console.log("unsuccessful update");
        }
      }
};

    









document.querySelector('.updateBtn').addEventListener('click', updateCompetition);
 