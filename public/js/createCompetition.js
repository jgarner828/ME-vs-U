const createCompetition = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const title = document.querySelector("#title").value.trim();
  const category = document.querySelector("#category").value.trim();
  const rules = document.querySelector("#rules").value.trim();
  const start_date = document.querySelector("#start_date").value.trim();
  const end_date = document.querySelector("#end_date").value.trim();
  const quantity = document.querySelector("#quantity").value.trim();
  const uom = document.querySelector("#uom").value.trim();
  const reward = "trophy-outline";
  console.log(title);
  console.log(category);

  if (
    title &&
    category &&
    rules &&
    start_date &&
    end_date &&
    reward &&
    quantity &&
    uom
  ) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/competitions/addcompetition", {
      method: "POST",
      body: JSON.stringify({
        title,
        category,
        rules,
        start_date,
        end_date,
        reward,
        quantity,
        uom,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {

      document.location.replace(`${response.url}`);

    } else {
      alert(response.statusText);
      console.log("unsuccessful created competition");
    }
  }
};

document
  .querySelector("#createButton")
  .addEventListener("click", createCompetition);
