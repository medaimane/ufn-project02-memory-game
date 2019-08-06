const appState = {
  game: null,
  moves: 0,
};

const startGame = () => {
  const game = new Game();
  game.buildGridOfCards();
  game.addClickEventListener();
  appState.game = game;
};

startGame();
