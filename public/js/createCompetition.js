const createCompetition = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const title = document.querySelector('#title').value.trim();
    const category = document.querySelector('#category').value.trim();
    const rules = document.querySelector('#rules').value.trim();
    const start_date = document.querySelector('#start_date').value.trim();
    const end_date = document.querySelector('#end_date').value.trim();
    const reward = document.querySelector('#reward').value.trim();
    const quantity = document.querySelector('#quantity').value.trim();
    const uom = document.querySelector('#uom').value.trim();
    const isPublic = document.querySelector('#isPublic').value.trim();


    if (title && category && rules &&  start_date && end_date && reward && quantity && uom && isPublic) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/competitions/addcompetition', {
        method: 'POST',
        body: JSON.stringify({ title, category, rules, start_date, end_date, reward, quantity, uom, isPublic }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the blog posts
        document.location.replace('/');
        console.log("successfully created competition");
      } else {
        alert(response.statusText);
        console.log("unsuccessful created competition");
      }
    }
  };
  

  
  document
    .querySelector('#createButton')
    .addEventListener('click', createCompetition);
  
