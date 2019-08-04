// Define a game class/data structure
class Game {
  constructor(cardIcons) {
    this.cardIcons = cardIcons;
    this.board = document.createDocumentFragment();
    this.cards = [];
  }

  buildCardsBoard = () => {
    const shuffledFaIcons = this.shuffleTwice(faIcons);
    
    shuffledFaIcons.forEach((icon, index) => {
      const card = new Card(index, icon);

      card.buildCardHtml();
      
      this.board.appendChild(card.getCardHtml());
  
      this.cards.push(card);
    });
  }

  addCardsBoard = () => {
    cardsContainer.textContent = '';
    cardsContainer.appendChild(this.board);
  }

  shuffleTwice = array => {
    return [
      ...this.shuffle(array),
      ...this.shuffle(array),
    ];
  };

  // Shuffle function from http://stackoverflow.com/a/2450976
  shuffle = array => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
  };
}