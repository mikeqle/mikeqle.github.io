/* ========================================================= */
// Keys in this script:
//   [TBU]: to be updated - work to be continued
//   [TBR]: to be removed - mostly console.log for debugging purposes
//   [ToCheck]


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

// For card positioning
Hand.prototype.leftIncr  =  0.8;  // For positioning cards.
Hand.prototype.topIncr   =  0.2;
Hand.prototype.rollEvery =  5;

function Hand(owner, splitcount) {
  this.cards      = new Array();

  this.cardsNode  = document.getElementById(owner+splitcount);
  // this.scoreNode  = document.getElementById(owner+splitcount+"Score"); // [TBU] - Add a div middle of the playing field to display result

  this.score      = handScore;
// we will need to extract div id to send the cards to display
// we will need addCard, clear, and reset functions [TBU]
  this.addCard    = handAddCard;
  this.removeCard = handRemoveCard;
  this.clear      = handClear;
  this.reset      = handReset;

  this.owner     = owner;
  this.handname  = owner+splitcount;

  this.reset();
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
  var card;
  hand.cards.push(deck.cards[0]);
  return card = this.cards.shift();
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

function handAddCard(card, down) {
  var node;

  // Create a card node for display, set as face down if requested.

  node = card.createNode();
  if (down)
    node.firstChild.style.visibility = "hidden";

  // Add the card display to the associated card area on the page.

  node.style.left = this.left + "em";
  node.style.top  = this.top  + "em";
  this.cardsNode.appendChild(node);
  this.left += this.leftIncr;

  if (this.cards.length % this.rollEvery == 0)
    this.top = 0;
  else
    this.top += this.topIncr;
}

function handRemoveCard() {
  var card;
  // Remove the last card in the array and save it.
  card = null;
  if (this.cards.length > 0) {
    card = this.cards.pop();
    // Remove the card node from the display and reset position.
    this.cardsNode.removeChild(this.cardsNode.lastChild);
    this.left -= this.leftIncr;
    this.top  -= this.topIncr;
  }

  // Return the card.

  return card;
}

function handReset() {
  // Remove any cards and initialize properties.

  this.clear();

  this.cards     = new Array();
  
  this.blackjack = false;
  this.busted    = false;
  this.soft      = false;
  this.surrender = false;
  
  this.left      = 0;
  this.top       = 0;
}

function handClear() {
  while (this.cardsNode.lastChild)
    this.cardsNode.removeChild(this.cardsNode.lastChild);
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
    hands[i].clear();
    hands[i].reset();
  }

  dealerHand.cards.length = 0;
  dealerHand.clear();
  dealerHand.reset();
// figure out a way to reset bets amount to last round bet. current bet may be modified because of double
  current = 0;
  hands.length = 0;
  hands = [player0Hand, compAHand, compBHand, compCHand, compDHand];
  currentSplits = 0;
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
  for (i=1; i<hands.length; i++) {
    credits[hands[i].owner] -= bets[hands[i].handname];
  }

  updatePlayerCredit();

// deal first card
  for (i=1; i<hands.length; i++) {
    hands[i].addCard(deck.deal(hands[i]),false);
  }
  dealerHand.addCard(deck.deal(dealerHand),true);
// deal second card
  for (i=1; i<hands.length; i++) {
    hands[i].addCard(deck.deal(hands[i]),false);
  }
  dealerHand.addCard(deck.deal(dealerHand),false);

  // Testing [TBR]
  player0Hand.addCard(player0Hand.cards[0] = new Card ("A", "H"),false);
  player0Hand.addCard(player0Hand.cards[1] = new Card ("A", "D"),false);

  console.log ("Player hand: "+ player0Hand.score() + ". Dealer hand: " + dealerHand.score() + ". Current credit: " + credits["player"] ); // [TBR]

// check if dealer has blackjack / ace on second card
  checkBlackjack();
}

function onHit () {
  hands[current].addCard(deck.deal(hands[current]),false);
  hands[current].score();
  console.log (hands[current].handname + " score:" + hands[current].score()); // [TBR]
// if busted
  if (hands[current].busted || hands[current].score() === 21)
    endHand();
}

function onDouble() {
  hands[current].addCard(deck.deal(hands[current]),false);
  credits[hands[current].owner] -= bets[hands[current].handname];
  bets[hands[current].handname] += bets[hands[current].handname];
  updatePlayerCredit();
  endHand();
}

function onSplit() {
// move the second card to a new hand. [TBU]
  currentSplit += 1;

  switch (currentSplit) {
  case 1:
    player1Hand = new Hand("player", 1);
    bets["player1"] = bets[hands[current].handname];
    player1Hand.cards[0] = hands[current].cards[1];
    hands.splice(current+1, 0, player1Hand);
    hands[current+1].addCard(hands[current].cards[1],false); 
    hands[current].removeCard();
    break;

  case 2: 
    player2Hand = new Hand("player", 2);
    bets["player2"] = bets[hands[current].handname];
    player2Hand.cards[0] = hands[current].cards[1];
    hands.splice(current+1, 0, player2Hand);
    hands[current+1].addCard(hands[current].cards[1],false); 
    hands[current].removeCard();
    break;

  case 3:
    player3Hand = new Hand("player", 3);
    bets["player2"] = bets[hands[current].handname];
    player3Hand.cards[0] = hands[current].cards[1];
    hands.splice(current+1, 0, player3Hand);
    hands[current+1].addCard(hands[current].cards[1],false); 
    hands[current].removeCard();
    break;
  }
  
  hands[current].addCard(deck.deal(hands[current]),false);
  playerTurn();
  $('#'+hands[current].owner+currentSplit).removeClass('hide');
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
  $('#split').prop('disabled', true);
  hands[current].score();
  if (hands[current].blackjack) {
    endHand();
  }

  if (hands[current].cards.length === 2) { //[TBU] Cannot read property 'cards' of undefined
    $('#double').prop('disabled', false);
    $('#surrender').prop('disabled', false);
  }

  if (hands[current].cards[0].rank === hands[current].cards[1].rank && hands[current].cards.length === 2 && currentSplit < maxSplits ) {
    $('#split').prop('disabled', false);
  }
}

// AI acts according to basic strategy
function AITurn() {
  $('#buttonDiv button').prop('disabled', true);
  scoreAI = hands[current].score();
  soft = hands[current].soft;
  dealer1 = dealerHand.cards[1];
  // soft hand
//  while ((scoreAI) < 19) { // meaning if score is 19 or above, stand
    if (hands[current].soft) {

      if (dealer1.rank === "2") {
        switch (true) {
          case (scoreAI <= 17):
            onHit();
            break;
          case (scoreAI >17):
            onStand();
            break;
        }
      }

      if (dealer1.rank === "3") {
        switch (true) {
          case (scoreAI <= 16):
            onHit();
            break;
          case (scoreAI === 17 || scoreAI === 18):
            onDouble();
            break;
          case (scoreAI > 18):
            onStand();
            break;
        }
      }

      if (dealer1.rank === "4") {
        switch (true) {
          case (scoreAI <= 14):
            onHit();
            break;
          case (scoreAI > 14 && scoreAI < 19):
            onDouble();
            break;
          case (scoreAI > 19):
            onStand();
            break;
        }
      }

      if (dealer1.rank === "5" || dealer1.rank ==="6") {
        switch (true) {
          case (scoreAI <= 18):
            onDouble();
            break;
          case (scoreAI > 18):
            onStand();
            break;
        }
      }

      if (dealer1.rank === "7" || dealer1.rank ==="8") {
        switch (true) {
          case (scoreAI <= 17):
            onHit();
            break;
          case (scoreAI > 17):
            onStand();
            break;
        }
      }

      if (dealer1.rank === "9" || dealer1.rank ==="10" || dealer1.rank ==="J" || dealer1.rank ==="Q" || dealer1.rank ==="K" || dealer1.rank ==="A") {
        switch (true) {
          case (scoreAI <= 18):
            onHit();
            break;
          case (scoreAI > 18):
            onStand();
            break;
        }
      }

    }
    // hard hand
    else {

      if (dealer1.rank === "2") {
        switch (true) {
          case (scoreAI <= 9):
            onHit();
            break;
          case (scoreAI > 9 && scoreAI < 12):
            onDouble();
            break;
          case (scoreAI === 12):
            

        }
      }


    }
    scoreAI = hands[current].score();
    soft = hands[current].soft;
//  } goes with while

  endHand();
}

function dealerTurn() {
// dealer will have to hit when score is below hard 17 or soft 18 (dealer can stand at hard 17 or soft 18)
  dealerHand.score();
  while ( (dealerHand.score() < 17 && !dealerHand.soft) || (dealerHand.score() < 18 && dealerHand.soft ) )  {
    if (dealerHand.busted) 
      break;
    dealerHand.addCard(deck.deal(dealerHand),false);
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
      hands[current].addCard(deck.deal(hands[current]),false);
      hands[current].score();
      if (hands[current].blackjack)
      endHand();
    }
    if (hands[current].owner === "player") {
      playerTurn();
    }
    else AITurn();
  }
}

function endRound() {
  dealerHand.score();
  dealerHand.cardsNode.firstChild.firstChild.style.visibility = "";
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
  resetButton();
}

/* ============================================================== */
// On window load
window.onLoad = onPageLoad();




