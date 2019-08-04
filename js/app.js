// DOM elements
const cardsContainer = document.querySelector('ul[class="deck"]');

// state of the game
const appState = {
  game: null,
};

// Main program tp start the game
const startGame = () => {
  appState.game = new Game(faIcons);
  appState.game.buildCardsBoard();
  appState.game.addCardsBoard();
  console.log(appState.game);
};


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Run
startGame();
