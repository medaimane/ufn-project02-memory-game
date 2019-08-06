class Game {
  constructor() {
    this.cards = [];
    this.checkCards = [];
    this.matchedCards = [];

    this.moves = 0;

    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;

    this.timeCounter = null;
    this.timerStarted = false;

    this.gridFragment = document.createDocumentFragment();

    this.repeatElement = document.querySelector('.fa-repeat');

    this.gridOfCardsElement = document.querySelector('.deck');

    this.movesCounterElement = document.querySelector(".moves");

    this.starsElements = document.querySelector('.stars').childNodes;

    this.hoursTimerElement = document.querySelector(".hour");
    this.minutesTimerElement = document.querySelector(".minute");
    this.secondsTimerElement = document.querySelector(".seconds");

    this.bagde = '';
  }

  startGame = () => {
    this.buildGridOfCards();
    this.addClickEventListener();
  };

  restartGame = () => {
    // Reset app to initial state:
    this.timerStarted = false;

    this.moves = 0;
    this.movesCounterElement.innerHTML = '0 Moves';

    this.cards = [];
    this.matchedCards = [];
    this.checkCards = [];

    this.startGame();

    clearInterval(this.timeCounter);

    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.secondsTimerElement.innerText = "00";
    this.minutesTimerElement.innerText = " 00";
    this.hoursTimerElement.innerText = "00";

    this.resetStartsRating();
  };

  resetStartsRating = () => {
    this.starsElements[5].classList.remove('grey-color');
    this.starsElements[3].classList.remove('grey-color');
  };

  buildGridOfCards = () => {
    const shuffledFaIcons = this.shuffleTwice(faIcons);
    this.cards = shuffledFaIcons.map((icon, index) => {
      const card = new Card(index, icon);
      card.buildCardHtml();
      this.gridFragment.appendChild(card.getCardHtml());
      return card;
    });
    this.addGridOfCards();
  };

  addGridOfCards = () => {
    this.gridOfCardsElement.textContent = '';
    this.gridOfCardsElement.appendChild(this.gridFragment);
  };

  addClickEventListener = () => {
    this.repeatElement.addEventListener('click', () => {
      this.restartGame();
    });
    this.gridOfCardsElement.addEventListener('click', event => {
      const cardId = event.target.id;
      if (cardId) {
        const selectedCard = this.cards[cardId];
        if (selectedCard.mode === cardMode.NOT_OPEN_SHOW) {
          if (this.timerStarted === false) {
            this.startTimer();
            this.timerStarted = true;
          }
          this.openedCard(selectedCard);
          this.setCheckedCard(selectedCard);
        }

        if (this.checkCards.length === 2) {
          this.gridOfCardsElement.classList.add('break-event');
          this.movesCounter();
          const [card1, card2] = this.checkCards;
          card1.isMatch(card2) ? this.matched() : setTimeout(this.notMatched, 800);
          this.showWinGameModal();
        }
      }
    });
  };

  showWinGameModal = () => {
    if (this.matchedCards.length === 16) {
      clearInterval(this.timeCounter);
      this.showAlertModal();
    }
  };

  showAlertModal = () => {
    const title = `<div>
        <span><u>Congratulations!</u></span>
        <span>You made it in ${this.getFormatedTimeElements()}</span>
        <span>Badge: ${this.bagde}</span>
        <span>Your moves is ${this.moves}</span>
    </div>`;

    Swal.fire({
      title,
      width: 600,
      padding: '2em',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Restart',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i> Next time',
      cancelButtonAriaLabel: 'Thumbs down, Next time',
      background: '#fff url(img/trees.png)',
      backdrop: `
          rgba(0,0,123,0.4)
          url("img/nyan-cat.gif")
          center left
          no-repeat
        `
    }).then((result) => {
      if (result.value) {
        this.restartGame();
      }
    });
  };

  setCheckedCard = card => {
    this.checkCards.push(card);
  };

  matched = () => {
    const [card1, card2] = this.checkCards;

    if (card1 && card2) {
      this.setMatchedCards(card1, card2);
    }

    this.checkCards = [];

    this.gridOfCardsElement.classList.remove('break-event');
  };

  notMatched = () => {
    const [card1, card2] = this.checkCards;

    if (card1 && card2) {
      this.closedCard(card1);
      this.closedCard(card2);
    }

    this.checkCards = [];

    this.gridOfCardsElement.classList.remove('break-event');
  };

  setMatchedCards = (card1, card2) => {
    this.matchedCard(card1);
    this.matchedCard(card2);

    this.matchedCards.push(card1);
    this.matchedCards.push(card2);
  };

  matchedCard = card => {
    card.setAndSwitchCardMode(cardMode.MATCHED);
  };

  closedCard = card => {
    card.setAndSwitchCardMode(cardMode.NOT_OPEN_SHOW);
  };

  openedCard = card => {
    card.setAndSwitchCardMode(cardMode.OPEN_SHOW);
  };

  movesCounter = () => {
    this.moves++;
    this.movesCounterElement.innerHTML = this.formatMoves(this.moves);
    this.starsRating();
  };

  starsRating = () => {
    if (this.moves === 16) {
      this.bagde = 'Awesome!';
      this.starsElements[5].classList.add('grey-color');
    } else if (this.moves === 24) {
      this.bagde = 'Not that bad, Replay!';
      this.starsElements[3].classList.add('grey-color');
    }
  };

  startTimer = () => {
    if (this.seconds === 0) {
      this.seconds++;
    }
    this.timeCounter = this.setOneSecondInterval();
  };

  setOneSecondInterval = () => {
    return setInterval(() => {
      this.formatTimeElements();
      this.calculateTime();
    }, 1000);
  };

  calculateTime = () => {
    this.seconds++;
    if (this.seconds === 60) {
      this.minutes++;
      this.seconds = 0;
    } else if (this.minutes === 60) {
      this.hours++;
      this.minutes = 0;
    }
  };

  formatTimeElements = () => {
    this.secondsTimerElement.innerHTML = this.formatTime(this.seconds);
    this.minutesTimerElement.innerHTML = this.formatTime(this.minutes);
    this.hoursTimerElement.innerHTML = this.formatTime(this.hours);
  };

  getFormatedTimeElements = () => {
    return `${
      this.hoursTimerElement.innerHTML
    } : ${
      this.minutesTimerElement.innerHTML
    } : ${
      this.secondsTimerElement.innerHTML
    }`;
  };

  formatTime = time => {
    return time < 10 ? ` 0${time}` : ` ${time}`;
  };

  formatMoves = (moves) => {
    return moves === 1 ? `1  Move` : `${moves}  Moves`;
  };

  shuffleTwice = array => {
    return [
      ...this.shuffle(array),
      ...this.shuffle(array),
    ];
  };

  shuffle = array => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

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
