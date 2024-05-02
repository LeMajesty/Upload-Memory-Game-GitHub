const gameContainer = document.getElementById("game");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let shuffledColors = [];

let firstCard = null;
let secondCard = null;
let canClick = false;

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card");
    newDiv.classList.add("hidden");
    newDiv.dataset.color = color;
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  if (!canClick) return;
  
  const clickedCard = event.target;
  
  if (!clickedCard.classList.contains("hidden") || !canClick) return;
  
  clickedCard.style.backgroundColor = clickedCard.dataset.color;
  
  if (!firstCard) {
    firstCard = clickedCard;
  } else {
    secondCard = clickedCard;
    canClick = false;
    setTimeout(checkForMatch, 1000);
  }
}

function checkForMatch() {
  if (firstCard.dataset.color === secondCard.dataset.color) {
    firstCard.removeEventListener("click", handleCardClick);
    secondCard.removeEventListener("click", handleCardClick);
    resetCards();
  } else {
    firstCard.style.backgroundColor = "";
    secondCard.style.backgroundColor = "";
    resetCards();
  }
}

function resetCards() {
  firstCard = null;
  secondCard = null;
  canClick = true;
}

function startGame() {
 
  gameContainer.innerHTML = "";
  
 
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  
 
  canClick = true;
}

function restartGame() {
 
  gameContainer.innerHTML = "";
  
 
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  
  
  firstCard = null;
  secondCard = null;
  canClick = false;
}
