/* ========================================================= */
// Keys in this script:
//   [TBU]: to be updated - work to be continued
//   [TBR]: to be removed - mostly console.log for debugging purposes


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
  this.cards      = new Array();

  this.score      = handScore;
// we will need to extract div id to send the cards to display
// we will need addCard, clear, and reset functions [TBU]
  this.addCard    = handAddCard;
  this.removeCard = handRemoveCard;
  this.clear      = handClear;
  this.reset      = handReset;

  this.blackjack = false;
  this.busted    = false;
  this.soft      = false;
  this.surrender = false;
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
// check soft or hard hand
  if (aceIncluded === true && score <= 11) {
    this.soft = true;
    score = score + 10;
  }
// check blackjack
  if (score === 21 && this.cards.length === 2)
    this.blackjack = true;
// check if busted
  if (score > 21)
    this.busted = true;

  return score;
}

function handAddCard() {
// [TBU]
}

function handRemoveCard() {
// [TBU]
}

function handReset() {
// [TBU]
}

function handClear() {
// [TBU]
}

/* ========================================================= */
// Global variables & constants

var numDecks   = 8;
var numShuffle = 20;
var credit = 1000;
var maxSplits = 3;
var burnCard, deck; 
var currentSplit = 0;

/* ========================================================= */
// Declare player hands

dealerHand  = new Hand("dealer", 0);
player0Hand = new Hand("player", 0);
compAHand   = new Hand("compA", 0);
compBHand   = new Hand("compB", 0);
compCHand   = new Hand("compC", 0);
compDHand   = new Hand("compD", 0);
var player1Hand, player2Hand, player3Hand;

/* ========================================================= */

// Declare hand arrays and dictionaries
hands = [player0Hand, compAHand, compBHand, compCHand, compDHand];
var current = 0; // This is to indicate the current hand in the hands array

handnames = {"player0": player0Hand, "player1": player1Hand, "player2": player2Hand, "player3": player3Hand, "compA0": compAHand, "compB0": compBHand, "compC0": compCHand, "compD0": compDHand};
credits = {"player": 1000, "compA": 1000, "compB": 1000, "compC": 1000, "compD": 1000};
bets = {"player0": 10, "player1": 10, "player2": 10, "player3": 10, "compA0": 10, "compB0": 10, "compC0": 10, "compD0": 10};


/* ========================================================= */
// newDeck and newRound functions

function newDeck() {
  deck = new Stack();
  deck.createDeck(numDecks);
  deck.shuffle(numShuffle);
}

function newRound() {
  for (i = 0; i<hands.length; i++) {
    hands[i].cards.length = 0;
  }
  dealerHand.cards.length = 0;
// figure out a way to reset bets amount to last round bet. current bet may be modified because of double
  current = 0;
}

function resetButton() {
  $('#deal').prop('disabled', false);
  $('#hit').prop('disabled', true);
  $('#double').prop('disabled', true);
  $('#split').prop('disabled', true);
  $('#stand').prop('disabled', true);
  $('#surrender').prop('disabled', true);
}

/* ========================================================= */
// Button functions

function onDeal() {
  newRound();

  $('#deal').prop('disabled', true);
// take all bets
  for (i=0; i<hands.length; i++) {
    credits[hands[i].owner] -= bets[hands[i].handname];
  }

  updatePlayerCredit();

// deal first card
  for (i=0; i<hands.length; i++) {
    deck.deal(hands[i]);
  }
  deck.deal(dealerHand);
// deal second card
  for (i=0; i<hands.length; i++) {
    deck.deal(hands[i]);
  }
  deck.deal(dealerHand);

  console.log ("Player hand: "+ player0Hand.score() + ". Dealer hand: " + dealerHand.score() + ". Current credit: " + credits["player"] ); // [TBR]

// check if dealer has blackjack / ace on second card
  checkBlackjack();
}

function onHit () {
  deck.deal(hands[current]);
  hands[current].score();
  console.log (hands[current].handname + " score:" + hands[current].score()); // [TBR]
// if busted
  if (hands[current].busted || hands[current].score() === 21)
    endHand();
}

function onDouble() {
  deck.deal(hands[current]);
  credits[hands[current].owner] -= bets[hands[current].handname];
  bets[hands[current].handname] += bets[hands[current].handname];
  updatePlayerCredit();
  endHand();
}

function onSplit() {
// move the second card to a new hand. [TBU]
  currentSplit += 1;
  handname[hands[current].owner+currentSplit] = new Hand (hands[current].owner, currentSplit);

}

function onStand() {
  endHand();
}

function onSurrender() {
  credits[hands[current].owner] += bets[hands[current].handname] / 2;
  updatePlayerCredit();
  endHand();
}

function onInsurance() {
  // promt when Ace is shown on dealer hand
  var insuranceCost; // insurance cost will be half of original best
  if (confirm("Would you like to get insurance?")) {
    insuranceCost = bets[hands[current].handname] / 2;
    credits[hands[current].owner] -= insuranceCost;

    if (dealerHand.blackjack) {
      alert ("Dealer has blackjack. You win!");
      credits[hands[current].owner] += insuranceCost * 2;
    }
    else
      alert("Dealer does not have blackjack. you lose " + insuranceCost);
  }
  if (hands[current].owner === "player")
    updatePlayerCredit();
}



/* ============================================================== */
// Background functions

// Gameplay right after the hands are dealt
function checkBlackjack() {
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
// If not, proceed to first player (player turn)
  else {
    playerTurn();
  }
}

function playerTurn() {
  $('#deal').prop('disabled', true);
  $('#hit').prop('disabled', false);
  $('#stand').prop('disabled', false);

  if (hands[current].blackjack) {
    endHand();
  }

  if (hands[current].cards.length === 2) { //[TBU] Cannot read property 'cards' of undefined
    $('#double').prop('disabled', false);
    $('#surrender').prop('disabled', false);
  }

  if (hands[current].cards[0] === hands[current].cards[1] && hands[current].cards.length === 2 && currentSplit < maxSplits ) {
    $('#split').prop('disabled', false);
  }
}

function AITurn() {
  $('#buttonDiv button').prop('disabled', true);
  // [TBU]
  endHand();
}

function dealerTurn() {
// dealer will have to hit on soft 17 [TBU]
  dealerHand.score();
  while ( (dealerHand.score() < 18) || (dealerHand.score() === 17 && !dealerHand.soft ) ) {
    deck.deal(dealerHand);
    dealerHand.score();
  }
  endRound();
}

function endHand() {
  hands[current].score();
  current += 1;

  if (current >= hands.length) {
    dealerTurn();
  }
  else {
    if (hands[current].cards.length === 1) {
      deck.deal(hands[current]);
    }
    if (hands[current].owner === "player") {
      playerTurn();
    }
    else AITurn();
  }
}

function endRound() {
  dealerHand.score();
  for (i=0; i<hands.length; i++) {
    // if player surrender take money and move on
    if (hands[i].surrender){
      console.log(hands[i].handname + " surrendered. " + hands[i].score() + ". Credit is: " + credits[hands[i].owner] );
    }
    else {
      if (!dealerHand.blackjack && hands[i].blackjack) {
        credits[hands[i].owner] += bets[hands[i].handname]*2.5 ;
        console.log(hands[i].handname + " has . " + hands[i].score() + ". Credit is: " + credits[hands[i].owner] );
      }
      else {
        if ( (dealerHand.blackjack && !hands[i].blackjack) || hands[i].busted || (dealerHand.score() > hands[i].score() && !dealerHand.busted) ) {
          console.log(hands[i].handname + " loses. " + hands[i].score() + ". Credit is: " + credits[hands[i].owner] );
        }
        else {
          if ( (dealerHand.blackjack && hands[i].blackjack) || (dealerHand.score() === hands[i].score()) ) {
            credits[hands[i].owner] += bets[hands[i].handname];
            console.log(hands[i].handname + " draw. " + hands[i].score() + ". Credit is: " + credits[hands[i].owner] );
          }
          else {
            if (dealerHand.busted || hands[i].score() > dealerHand.score()) {
              credits[hands[i].owner] += bets[hands[i].handname]*2;
              console.log(hands[i].handname + " wins. " + hands[i].score() + ". Credit is: " + credits[hands[i].owner] );
            }
          }
        }
      }
    }
  }
  console.log("Dealer score: " + dealerHand.score()); // [TBR]
  console.log("***********************************"); // [TBR]
  resetButton();
}

function updatePlayerCredit() {
//[TBU]
}

/* ========================================================= */
// onLoad function: will happen at beginning of game

function onPageLoad () {
  newDeck();
  newRound();
}

/* ============================================================== */
// On window load
window.onLoad = onPageLoad();


// for (i=0; i<11; i++) {
//   console.log("card " + i + " rank " + deck.cards[i].rank + deck.cards[i].suit);
// }
// onDeal();
// console.log (dealerHand.owner + " " +dealerHand.cards[0].rank + dealerHand.cards[0].suit);
// console.log (dealerHand.owner + " " +dealerHand.cards[1].rank + dealerHand.cards[1].suit);
// for (i=0; i < hands.length; i++) {
//   console.log (i + " " + hands[i].cards[0].rank + hands[i].cards[0].suit);
//   console.log (i + " " + hands[i].cards[1].rank + hands[i].cards[1].suit);
// }



/*- Game advice
    - Teach player by keeping a record of how things should be done at each step
      + Score
      + Recognize the dealer up card
      + Check against the recommended table
      + Repeat at every step the user play
*/





