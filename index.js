// Get references to HTML elements
let animalList = document.getElementById('animal-list');
let animalDetails = document.getElementById('animal-details');
let resetButton = document.getElementById('reset-button');
let currentAnimal = null;

// Fetch data from the server and populate the animal list
fetch('http://localhost:3000/characters')
  .then(response => response.json())
  .then(characters => {
    for (const character of characters) {
      // Create a button for each character
      let animalNameButton = document.createElement('button');
      animalNameButton.textContent = character.name;
      animalNameButton.classList.add('animal-name');

      // Append the button to the animal list
      animalList.appendChild(animalNameButton);

      // Add click event listener to each animal name button
      animalNameButton.addEventListener('click', () => {
        if (currentAnimal !== character.id) {
          currentAnimal = character.id;
          // Fetch the details of the clicked animal from the server
          fetch(`http://localhost:3000/characters/${character.id}`)
            .then(response => response.json())
            .then(animal => {
              // Clear the animal details container
              animalDetails.innerHTML = '';

              // Create elements for the animal details
              let animalDetailsContainer = document.createElement('div');
              animalDetailsContainer.classList.add('animal-details-container');

              let animalImage = document.createElement('img');
              animalImage.src = animal.image;
              animalImage.alt = animal.name;

              let animalNameHeader = document.createElement('h2');
              animalNameHeader.textContent = animal.name;

              // Create vote count element and set it to the value from the server
              let voteCount = document.createElement('span');
              voteCount.classList.add('vote-count');
              voteCount.textContent = animal.votes; // Set votes to the value from the server

              // Create vote button
              let voteButton = document.createElement('button');
              voteButton.textContent = 'VOTE';
              voteButton.classList.add('vote-button');

              // Create reset button
              let resetButton = document.createElement('button');
              resetButton.textContent = 'RESET';
              resetButton.classList.add('reset-button');

              // Append elements to the animal details container
              animalDetailsContainer.appendChild(animalImage);
              animalDetailsContainer.appendChild(animalNameHeader);
              animalDetailsContainer.appendChild(voteCount);
              animalDetailsContainer.appendChild(voteButton);
              animalDetailsContainer.appendChild(resetButton);
              // Append the animal details container to the animal details section
              animalDetails.appendChild(animalDetailsContainer);

              // Add click event listener to the vote button
              voteButton.addEventListener('click', () => {
                // Update the vote count on the server
                fetch(`http://localhost:3000/characters/${character.id}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    votes: animal.votes + 1,
                  }),
                })
                  .then(response => response.json())
                  .then(updatedAnimal => {
                    // Update the vote count on the client side
                    voteCount.textContent = updatedAnimal.votes;
                  });
              });

              // Add click event listener to the reset button
              resetButton.addEventListener('click', () => {
                // Reset the vote count on the server
                fetch(`http://localhost:3000/characters/${character.id}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    votes: 0,
                  }),
                })
                  .then(response => response.json())
                  .then(updatedAnimal => {
                    // Reset the vote count on the client side
                    voteCount.textContent = updatedAnimal.votes;
                  });
              });
            });
        }
      });
    }
  });

// Add click event listener to the reset button
resetButton.addEventListener('click', () => {
  // Reset all vote counts on the server
  fetch('http://localhost:3000/characters', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      votes: 0,
    }),
  })
    .then(response => response.json())
    .then(updatedAnimals => {
      // Reset all vote counts on the client side
      let voteCounts = document.getElementsByClassName('vote-count');
      for (let i = 0; i < voteCounts.length; i++) {
        voteCounts[i].textContent = updatedAnimals[i].votes;
      }
    });
});
