const inviteButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-response')) {
      const response = event.target.getAttribute('data-response');
      const scoreboard_id = event.target.getAttribute('data-id');

        if(response=='accept'){
            const isAccepted = true;
            const isDeclined = false;
            const response = await fetch(`/api/scoreboard/${scoreboard_id}`, {
                method: 'PUT',
                body: JSON.stringify({isAccepted,isDeclined}),
                headers: {
                  'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                document.location.replace('/dashboard');
              } else {
                alert('Failed to update response');
              };
        };
        if(response=='decline'){
            const isAccepted = false;
            const isDeclined = true;
            const response = await fetch(`/api/scoreboard/${scoreboard_id}`, {
                method: 'PUT',
                body: JSON.stringify({isAccepted, isDeclined}),
                headers: {
                  'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                document.location.replace('/dashboard');
              } else {
                alert('Failed to update response');
              };

        };
    };


  };
  
  
  document
    .querySelector('#pending-invites')
    .addEventListener('click', inviteButtonHandler);