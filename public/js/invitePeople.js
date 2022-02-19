// const url= window.location.href;
// const users=[];
// console.log(comp_id);

const getUsers =  function(event) {
    // event.preventDefault();
  
    // // Collect values from the login form
    // const user_id = 1;
    // const score = 0;
    // const competition_id = 20;


    //   // Send a POST request to the API endpoint
    //   const response = await fetch("/api/scoreboard/add", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       user_id,
    //       score,
    //       competition_id,
    //     }),
    //     headers: { "Content-Type": "application/json" },
    //   });
  
    //   if (response.ok) {
  
    //     document.location.replace('/dashboard');
  
    //   } else {
    //     alert(response.statusText);
    //     console.log("unsuccessful");
    //   }

      document.location.replace('/dashboard');
    };
 


  document
  .querySelector("#add-users")
  .addEventListener("submit", getUsers);




