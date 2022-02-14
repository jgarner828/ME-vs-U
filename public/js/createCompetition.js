const createCompetition = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#title').value.trim();
    const category = document.querySelector('#category').value.trim();
    const description = document.querySelector('#description').value.trim();
    const duration = document.querySelector('#duration').value.trim();
    const reward = document.querySelector('#reward').value.trim();
    const quantity = document.querySelector('#quantity').value.trim();
    const uom = document.querySelector('#uom').value.trim();
    const ispublic = document.querySelector('#ispublic').value.trim();

    if (name && category && description && duration && reward && quantity && uom && ispublic) {
        const response = await fetch(`/api/competitions`, {
          method: 'POST',
          body: JSON.stringify({ name, description, duration, reward, quantity, uom, ispublic }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
            document.location.replace('/competition');
          } else {
            alert('Failed to create competition');
          }
        }


        document
        .querySelector('#competitionform')
        .addEventListener('submit', createCompetition);
}