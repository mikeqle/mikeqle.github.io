
/* ========================================================= */

// Define Card and Stack objects

function Card(rank,suit) {
  this.rank = rank;
  this.suit = suit;
}

function Stack () {
  this.cards = new Array();

  this.createDeck  = stackCreateDeck;
  this.shuffle     = stackShuffle;
  this.deal        = stackDeal;
  this.combine     = stackCombine;
  this.score       = stackScore;
}

/* ========================================================= */

// Stack functions

function stackCreateDeck (noOfDecks) {
// create a stack of cards going from A through K and 4 suits
  var suits = ["H", "D", "C", "S"];
  var ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  for (i=0; i < noOfDecks; i++) {
    for (j=0; j < suits.length; j++) {
      for (k = 0; k < ranks.length; k++) {
        this.cards[k + 13*j + 52*i] = new Card(ranks[k],suits[j]);
      }
    }
  }
}

function stackShuffle (n) {
// using the method found here: https://bost.ocks.org/mike/shuffle/
  var i, temp, j;

  for (k = 0; k<n; k++) {
    for (i = this.cards.length -1; i > 0; i--) {
      j = Math.floor(Math.random()*i);

      temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }
}

// deal a card to player

function stackDeal(hand) {
  hand.cards.push(deck.cards[0]);
  this.cards.shift();
}

// Add an array of cards to the end of the stack
function stackCombine(array) {
  this.cards.concat(array);
}


function stackScore() {
  var score = 0, aceIncluded;
  soft = false;
  blackjack = false;
  busted = false;
  for (k = 0; k < this.cards.length; k++) {
    switch (this.cards[k].rank) {
      case "A":
        score = score + 1;
        aceIncluded = true;
        break;
      case "2":
        score = score + 2;
        break;
      case "3":
        score = score + 3;
        break;
      case "4":
        score = score + 4;
        break;
      case "5":
        score = score + 5;
        break;
      case "6":
        score = score + 6;
        break;
      case "7":
        score = score + 7;
        break;
      case "8":
        score = score + 8;
        break;
      case "9":
        score = score + 9;
        break;
      case "10":
        score = score + 10;
        break;
      case "J":
        score = score + 10;
        break;
      case "Q":
        score = score + 10;
        break;
      case "K":
        score = score + 10;
        break;
    }
  }
  if (aceIncluded === true && score <= 11) {
    soft = true;
    score = score + 10;
  }
  if (score === 21 && this.cards.length === 2) {
    blackjack = true;
  }
  if (score > 21) {
    busted = true;
  }
  return score;
}

/* ========================================================= */

// Global variables

var numDecks   = 8;
var numShuffle = 10;
var credit = 1000;

var soft, busted, blackjack;

/* ========================================================= */

playerHand1 = new Stack();



/* ========================================================= */

function newDeck() {
  deck = new Stack();
  deck.createDeck(numDecks);
  deck.shuffle(numShuffle);
}

function initGame () {
  
}


// Button functions
function onDeal() {
// start a new game
}

function onHit (hand) {
  deck.deal(hand);
  hand.score();
  if (busted) {
// end the game for this hand
  }
  // update the score
}

function onDouble(hand) {
  deck.deal(hand);
  hand.score();
// update score, end the game, check if busted
}

function onSplit(hand) {
// check it reach split limit, move the second card to a new hand. 
}

function onStand(hand) {
// end game
}

function onInsurance(hand) {
  // promt when Ace is shown on dealer hand
  // check for blackjack right after
}

function onSurrender(hand) {
  // only available when hand has 2 cards
  // end game if chosen surrender
  // deactivate if hand length is 3 or more
}

// Testing
card1 = new Card ("A", "H");
card2 = new Card ("J", "H");
card3 = new Card ("5", "H");
card4 = new Card ("6", "H");

/*- Game advice
    - Teach player by keeping a record of how things should be done at each step
      + Score
      + Recognize the dealer up card
      + Check against the recommended table
      + Repeat at every step the user play
*/





