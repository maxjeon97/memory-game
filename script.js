"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */
const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple", "yellow",
  "red", "blue", "green", "orange", "purple", "yellow",
];
const colors = shuffle(COLORS);

const startButton = document.querySelector("#startbutton");
let startButtonClicked = false;
startButton.addEventListener("click", function() {
  if(startButtonClicked == false) {
    startButtonClicked = true;
    createCards(colors);
  }
});

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.querySelector("#game");
  for (let color of colors) {
    let temp = document.createElement("div");
    temp.className = color;
    temp.addEventListener("click", function() {
      handleCardClick(temp);
    });
    gameBoard.appendChild(temp);
  }

  const resetButton = document.createElement("button");
  resetButton.innerHTML = "Reset";
  resetButton.id = "resetbutton";
  gameBoard.appendChild(resetButton);
  resetButton.addEventListener("click", function() {
    removeAllChildren(gameBoard);
    const newColors = shuffle(colors);
    createCards(newColors);
  });
}

function removeAllChildren(parent) {
  while(parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  card.style.backgroundColor = card.className;
}

/** Flip a card face-down. */

function unFlipCard(card) {
  card.style.backgroundColor = "white";
}

/** Handle clicking on a card: this could be first-card or second-card. */

let card1 = undefined;
let card2 = undefined;
let cardIsFlipped = false;
let stopFlip = false;
function handleCardClick(evt) {
  if(stopFlip == true) {
    return;
  }
  else {
    if(cardIsFlipped == false) {
      card1 = evt;
      flipCard(card1);
      cardIsFlipped = true;
      return;
    }
    else {
      card2 = evt;
      flipCard(card2);
      stopFlip = true;
      checkMatch(card1, card2);
      return;
    }
  }
}

function checkMatch(card1, card2) {

}
