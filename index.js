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

      
      animalList.appendChild(animalNameButton);

      animalNameButton.addEventListener('click', () => {
        if (currentAnimal !== character.id) {
          currentAnimal = character.id;
          fetch(`http://localhost:3000/characters/${character.id}`)
            .then(response => response.json())
            .then(animal => {
              animalDetails.innerHTML = '';

              let animalDetailsContainer = document.createElement('div');
              animalDetailsContainer.classList.add('animal-details-container');

              let animalImage = document.createElement('img');
              animalImage.src = animal.image;
              animalImage.alt = animal.name;

              let animalNameHeader = document.createElement('h2');
              animalNameHeader.textContent = animal.name;

              let voteCount = document.createElement('span');
              voteCount.classList.add('vote-count');
              voteCount.textContent = '0'; // Set votes to zero

              let voteButton = document.createElement('button');
              voteButton.textContent = 'VOTE';
              voteButton.classList.add('vote-button');

              let resetButton = document.createElement('button');
              resetButton.textContent = 'RESET';
              resetButton.classList.add('reset-button');

              animalDetailsContainer.appendChild(animalImage);
              animalDetailsContainer.appendChild(animalNameHeader);
              animalDetailsContainer.appendChild(voteCount);
              animalDetailsContainer.appendChild(voteButton);
              animalDetailsContainer.appendChild(resetButton);
              animalDetails.appendChild(animalDetailsContainer);

              voteButton.addEventListener('click', () => {
                voteCount.textContent = parseInt(voteCount.textContent) + 1;
              });

              resetButton.addEventListener('click', () => {
                voteCount.textContent = '0';
              });
            });
        }
      });
    }
  });

resetButton.addEventListener('click', () => {
  let voteCounts = document.getElementsByClassName('vote-count');
  for (let i = 0; i < voteCounts.length; i++) {
    voteCounts[i].textContent = '0';
  }
});
