// Get references to HTML elements
let animalList = document.getElementById('animal-list');
let animalDetails = document.getElementById('animal-details');
let resetButton = document.getElementById('reset-button');
let currentAnimal = null;

// Fetch data from the server and populate the animal list
fetch('http://localhost:3000/characters')
  .then(response => response.json())
  .then(characters => {
    for (const character of characters) 