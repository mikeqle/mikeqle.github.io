
/* ========================================================= */

// Define Card and Stack objects

function Card(rank,suit) {
  this.rank = rank;
  this.suit = suit;
}

function Stack () {
  this.cards = new Array();

  this.createDeck = stackCreateDeck;
  this.shuffle    = stackShuffle;
  this.deal       = stackDeal;
  this.combine    = stackCombine;
  this.addCard    = stackAdd;
  this.countStack = stackCount;
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

function stackDeal() {
  this.cards.shift();
}

// Add an array of cards to the end of the stack
function stackCombine(array) {
  this.cards.concat(array);
}

// Add a single card to the end of the stack
function stackAdd(card) {
  this.cards.push(card);
}

// count remaining cards in the deck
function stackCount() {
  this.cards.length();
}


/* ========================================================= */

// Global variables

var numDecks   = 8;
var numShuffle = 4;
var credit = 1000;

/* ========================================================= */

function newDeck() {
  deck = new Stack();
  deck.createDeck(numDecks);
  deck.shuffle(numShuffle);
}

function initGame () {
  newDeck();
}

function score(hand) {
  if hand.cards.length() = 2 {
    if 
  }
}


// function score(hand) {
//   var handScore;


//   for (i = 0; i <hand.length; i++){

//     }

  
  
// }


/*- Game functions:
    - Score:
      + Evaluate value of the hand
      + Determine if the hand is soft or hard
      + Determine if bust
      + Determine if blackjack
    - Hit:
      + Remove card from Deck
      + Add that same card to Hand
      + Score
        * If busted: lose
        * If 21: automatically stop the hand, game stop
    - Double:
      + Similar to hit, except stop game (all options disabled)
      + Double the bet amount
    - Stand:
      + Stop game
    - Split:
      + If player's hand has two of the same card, enable this function.
      + Split hand into two separate hands and deal a minimum of one extra card per hand. Game continues as if normal
      + Bet is doubled
      + Can split up to 3 times (4 total hands)
    - Surrender
      + Give up the game at the beginning of the game. Lose half of the origninal bet and get back the other half. Game ends
    - Insurance
      + Available when dealer up card is Ace.
      + Cost half of original bet. Pays 2:1 if dealer has blackjack
      + Alert user and ask for a decision. After decision, dealer check if his hand is blackjack. If yes, game ends, otherwise continues as normal 
*/

/*- Game advice
    - Teach player by keeping a record of how things should be done at each step
      + Score
      + Recognize the dealer up card
      + Check against the recommended table
      + Repeat at every step the user play
*/





