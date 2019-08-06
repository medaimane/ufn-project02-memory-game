class Card {
  constructor(id, icon, mode = cardMode.NOT_OPEN_SHOW) {
    this.id = id;
    this.icon = icon;
    this.mode = mode;
    this.cardLiElement = document.createElement('li');
    this.cardIElement = document.createElement('i');
  }

  buildCardHtml = () => {
    this.cardLiElement.id = this.id;
    this.cardLiElement.appendChild(this.cardIElement);
    this.addCardIconClass();
    this.addCardClass();
  };

  getCardHtml = () => {
    return this.cardLiElement;
  };

  addCardIconClass = () => {
    this.cardIElement.className = this.icon;
  };

  setAndSwitchCardMode = mode => {
    this.mode = mode;
    this.clearCardClass();
    this.addCardClass();
  };

  addCardClass = () => {
    switch (this.mode) {
      case cardMode.NOT_OPEN_SHOW: {
        this.cardLiElement.className = cardCalss.card;
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

  clearCardClass = () => {
    this.cardLiElement.className = '';
  };

  isMatch = card => {
    return this.icon === card.icon && this.id !== card.id;
  };
}
