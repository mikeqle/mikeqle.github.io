
/* ========================================================= */

// Define Card and Stack objects

function Card(rank,suit) {
  this.rank       = rank;
  this.suit       = suit;
  this.createNode = cardCreateNode;
}

function Stack () {
  this.cards = new Array();

  this.createDeck  = stackCreateDeck;
  this.shuffle     = stackShuffle;
  this.deal        = stackDeal;
  this.combine     = stackCombine;
}

function Hand(owner, splitcount) {
  this.cards     = new Array();
  this.score     = handScore;
  this.blackjack = false;
  this.busted    = false;
  this.soft      = false;
  this.owner     = owner;
  this.handname  = owner+splitcount;
}

/* ========================================================= */
// Load cardback image and face card images
var cardImg0 = new Image(); cardImg0.src= "img/cardback.gif";
var cardImg1 = new Image(); cardImg1.src= "img/jack.gif";
var cardImg2 = new Image(); cardImg2.src= "img/queen.gif";
var cardImg3 = new Image(); cardImg3.src= "img/king.gif";

// cardCreateNode: function to create a div from card rank & suit
function cardCreateNode() {
  var cardNode, frontNode, indexNode, spotNode, tempNode, textNode;
  var indexStr, spotChar;

  // Card node is the main element, will be the result of this function
  cardNode = document.createElement("DIV");
  cardNode.className = "card";

  // front of card
  frontNode = document.createElement("DIV");
  frontNode.className = "front";

  spotChar = "\u00a0"; // non breaking space
  
  switch (this.suit) {
    case "C":
      spotChar = "\u2663"; // club suit
      break;
    case "S":
      spotChar = "\u2660"; // spade suit
      break;
    case "H":
      frontNode.className += " red";
      spotChar = "\u2665"; // heart suit
      break;
    case "D":
      frontNode.className += " red";
      spotChar = "\u2666"; // diamond suit
      break;
  }

  // Create index to the upper left of the card node
  indexStr = this.rank;
  if (this.toString() === "")
    indexStr = "\u00a0";

  spotNode = document.createElement("DIV");
  spotNode.className = "index";
  textNode = document.createTextNode(indexStr);
  spotNode.appendChild(textNode);
  spotNode.appendChild(document.createElement("BR"));
  textNode = document.createTextNode(spotChar);
  spotNode.appendChild(textNode);
  frontNode.appendChild(spotNode);

  // Create and fill in spots appropriate with the card's rank
  // spotA1 to C5 are different locations on the card where the spotChar will occupy depending on the rank
  spotNode = document.createElement("DIV");
  textNode = document.createTextNode(spotChar);
  spotNode.appendChild(textNode);
  if (this.rank == "A") {
    spotNode.className = "ace";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
  }
  if (this.rank == "3" || this.rank == "5" || this.rank == "9") {
    spotNode.className = "spotB3";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
  }
  if (this.rank == "2" || this.rank == "3") {
    spotNode.className = "spotB1";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
  }
  if (this.rank == "2" || this.rank == "3") {
    spotNode.className = "spotB5";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
  }
  if (this.rank == "4" || this.rank == "5" || this.rank == "6" ||
      this.rank == "7" || this.rank == "8" || this.rank == "9" ||
      this.rank == "10") {
    spotNode.className = "spotA1";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
    spotNode.className = "spotA5";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
    spotNode.className = "spotC1";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
    spotNode.className = "spotC5";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
  }
  if (this.rank == "6" || this.rank == "7" || this.rank == "8") {
    spotNode.className = "spotA3";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
    spotNode.className = "spotC3";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
  }
  if (this.rank == "7" || this.rank == "8" || this.rank == "10") {
    spotNode.className = "spotB2";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
  }
  if (this.rank == "8" || this.rank == "10") {
    spotNode.className = "spotB4";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
  }
  if (this.rank == "9" || this.rank == "10") {
    spotNode.className = "spotA2";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
    spotNode.className = "spotA4";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
    spotNode.className = "spotC2";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
    spotNode.className = "spotC4";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
  }
  // For face cards (Jack, Queen or King), create and add the proper image.
  tempNode = document.createElement("IMG");
  tempNode.className = "face";
  if (this.rank == "J")
    tempNode.src = "img/jack.gif";
  if (this.rank == "Q")
    tempNode.src = "img/queen.gif";
  if (this.rank == "K")
    tempNode.src = "img/king.gif";

  // For face cards, add suit characters to the upper-left and lower-right corners.

  if (this.rank == "J" || this.rank == "Q" || this.rank == "K") {
    frontNode.appendChild(tempNode);
    spotNode.className = "spotA1";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
    spotNode.className = "spotC5";
    tempNode = spotNode.cloneNode(true);
    frontNode.appendChild(tempNode);
  }

  // Add front node to the card node.

  cardNode.appendChild(frontNode);

  // Return the card node.

  return cardNode;
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


// Hand functions

function handScore() {
  var score = 0, aceIncluded;
  this.soft = false;
  this.blackjack = false;
  this.busted = false;

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
    this.soft = true;
    score = score + 10;
  }
  if (score === 21 && this.cards.length === 2) {
    this.blackjack = true;
  }
  if (score > 21) {
    this.busted = true;
  }
  return score;
}



/* ========================================================= */

function newDeck() {
  deck = new Stack();
  deck.createDeck(numDecks);
  deck.shuffle(numShuffle);
}

function onPageLoad () {
  newDeck();

}

function clearhands() {
  for (i = 0; i<hands.length; i++) {
    hands[i].length = 0;
  }
}

// Button functions
// Game start with 


function onDeal() {
  clearhands();
// deal first card
  deck.deal(dealerHand);
  for (i=0; i<hands.length; i++) {
    deck.deal(hands[i]);
  }
// deal second card
  deck.deal(dealerHand);
  for (i=0; i<hands.length; i++) {
    deck.deal(hands[i]);
  }

  gameplay();
}

function onHit () {
  deck.deal(hand);
  hands[current].score();

  }
  
  // update the score and credit [TBU]

function onDouble() {
  deck.deal(hands[current]);
  hands[current].score();
// update score, end the game, check if busted
}

function onSplit(hand) {
// check it reach split limit, move the second card to a new hand. 
}

function onStand(hand) {
// end game
}

function onInsurance() {
  // promt when Ace is shown on dealer hand
  var insuranceCost; // insurance cost will be half of original best
  if (confirm("Would you like to get insurance?")) {
    insuranceCost = bets[hands[current].handname] / 2;
    credits[hands[current].owner] -= insuranceCost;

    if (dealerHand.blackjack) {
      alert ("Dealer has blackjack. You win!");
      credits[hands[current].owner] += insuranceCost;
    }
    else
      alert("Dealer does not have blackjack. you lose " + insuranceCost);
  }
  // update credit [TBU]
}

function onSurrender(hand) {
  // only available when hand has 2 cards
  // end game if chosen surrender
  // deactivate if hand length is 3 or more
}

function ifBusted() {
  if (hands[current].busted) {
// Display lose status [TBU]

// If busted, credit is reduce and the hand is done
  credits[hands[current].owner] -= bets[hands[current].handname];
  endHand();
  }
}

// Gameplay right after the card is dealt
function gameplay() {
  dealerHand.score();
  for (i=0; i<hands.length; i++) {
    hands[i].score();
  }

  if (dealerHand.cards[1].rank == "A") {
    onInsurance();
  }

// if dealer is blackjack, end round and check results
  if (dealerHand.blackjack) {
    endRound();
  }

// if not, proceed to individual gameplay: playerTurn & AITurn
  else {
    playerTurn();
  }
}

function playerTurn() {


// if player decided to hit, then extend playerTurn to next current count, else move to AITurn

}

function AITurn() {

}

function dealerTurn() {

}

function endHand() {
  hands[current].score();
  current += 1;

  if (current == hands.length) {
    endRound();
  }
}

function endRound() {
// Evaluate scenarios and pay off
  dealerHand.score();
  for (i=0; i<hands.length; i++) {
  // if dealer is blackjack
    if (dealer.blackjack) {
      if (hands[i].blackjack) {
        console.log(hands[i].handname + "push");
      } 
      else {
        credits[hands[i].owner] -= bets[hands[i].handname];
        console.log(hands[i].handname + "lost");
      }
    }
  // if dealer is not blackjack
    else {
      if (hands[i].blackjack) {
        credits[hands[i].owner] += bets[hands[i].handname]*2;
        console.log(hands[i].handname + "Wins Blackjack");
      }
      else if (dealerHand.score() > hands[i].score()){
        credits[hands[i].owner] -= bets[hands[i].handname];
        console.log(hands[i].handname + "lost");
      }
      else if (dealerHand.score() < hands[i].score()) {
        credits[hands[i].owner] += bets[hands[i].handname];
        console.log(hands[i].handname + "won");
      }
      else {
        console.log(hands[i].handname + "push");
      }
    }
  }
}

/* ========================================================= */

// Global variables & constants

var numDecks   = 8;
var numShuffle = 20;
var credit = 1000;

/* ========================================================= */
// Declare player hands

dealerHand  = new Hand("dealer", 0);
player0Hand = new Hand("player", 0);
compAHand   = new Hand("compA", 0);
compBHand   = new Hand("compB", 0);
compCHand   = new Hand("compC", 0);
compDHand   = new Hand("compD", 0);

/* ========================================================= */
// Declare bet values
var player0Bet = 10 ;
var player1Bet, player2Bet, player3Bet; // for split bets
var compABet = 5;
var compBBet = 5;
var compCBet = 5;
var compDBet = 5;

// Declare credit balance for all players
var playerCredit = 1000;
var compACredit = 1000;
var compBCredit = 1000;
var compCCredit = 1000;
var compDCredit = 1000;


// Declare hand arrays and dictionaries
hands = [player0Hand, compAHand, compBHand, compCHand, compDHand];
var current = 0; // This is to indicate the current hand in the hands array

credits = {"player":playerCredit, "compA":compACredit, "compB":compBCredit, "compC":compCCredit, "compD":compDCredit};
bets = {"player0": player0Bet, "player1": player1Bet, "player2": player2Bet, "player3": player3Bet, "compA0": compABet, "compB0": compBBet, "compC0": compCBet, "compD0": compDBet};


// Testing

newDeck();
for (i=0; i<11; i++) {
  console.log("card " + i + " rank " + deck.cards[i].rank + deck.cards[i].suit);
}
onDeal();
console.log (dealerHand.owner + " " +dealerHand.cards[0].rank + dealerHand.cards[0].suit);
console.log (dealerHand.owner + " " +dealerHand.cards[1].rank + dealerHand.cards[1].suit);
for (i=0; i < hands.length; i++) {
  console.log (i + " " + hands[i].cards[0].rank + hands[i].cards[0].suit);
  console.log (i + " " + hands[i].cards[1].rank + hands[i].cards[1].suit);
}

/*- Game advice
    - Teach player by keeping a record of how things should be done at each step
      + Score
      + Recognize the dealer up card
      + Check against the recommended table
      + Repeat at every step the user play
*/





