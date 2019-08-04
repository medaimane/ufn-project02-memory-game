/**
 * Define a Card class/data structure
 */
class Card {
  constructor(index, icon, mode = cardMode.NOT_OPEN_SHOW) {
    this.index = index;
    this.icon = icon;
    this.mode = mode;
    this.cardLiElement = document.createElement('li');
    this.cardIElement = document.createElement('i');
  }

  getCardHtml = () => {
    return this.cardLiElement;
  };

  buildCardHtml = () => {
    this.cardLiElement.appendChild(this.cardIElement);
    this.addIconClass();
    this.addCardClass();
  };

  addIconClass = () => {
    this.cardIElement.className = this.icon;
  };

  addCardClass = () => {
    switch (this.mode) {
      case cardMode.NOT_OPEN_SHOW: {
        this.cardLiElement.classList.add(cardCalss.card);
        break;
      }
      case cardMode.MATCHED: {
        this.cardLiElement.className = cardCalss.match;
        break;
      }
      case cardMode.OPEN_SHOW: {
        this.cardLiElement.className = cardCalss.openShow;
        break;
      }
    }
  };

  clicked = () => {

  };

  isMatched = card => {
    return this.icon === card.icon;
  };
}