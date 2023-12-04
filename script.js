
// adding the card deck and shuffle feature //
function makeDeck() {
    let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    let suits = ["Diamonds", "Spades", "Hearts", "Clubs"];
    let deck = [];

    for (let suit of suits) {
        for (let value of values) {
            deck.push(`${value} of ${suit}`);
        }
    }

    return deck;
}

function getShuffledDeck() {
    const deck = makeDeck();
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
}

    return deck;
}

const shuffledDeck = getShuffledDeck(); {
console.log(shuffledDeck);
}


let gameStarted = false;
let gameOver = false;

//deal out cards with deal function//

function deal() {
    if (gameInProgress) {
        console.log("A game is currently in progress");
    return;
}
    gameInProgress = true;
    gameOver = false;

    //remove the previous scores//
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    //Two cards get dealt to the player and dealer//
    for (let i = 0; i < 2; i++) {
        playerHand.push(drawCard());
        dealerHand.push(drawCard());
}

//calculate first round scores//
calculateScore();
updateUI();
//Check for 21 or Blackjack//
checkForBlackjack();
//this will allow you to draw a card when button is pressed//
function drawCard() {
    return deck.pop();
}
//function to calculate hands of player and dealer//
function calculateScores() {
    playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerHand);
}function calculateScore(hand) {
    let score = 0;
    let hasAce = false;
}
    for (let card of hand) {
        const value = card;
        if (value === "J" || if value === "Q" || if value == "K") {
            score += 10;
        } else if (value === "A") {
            score += 11;
//Ace is assumed to equal to 11 at this point//
            hasAce = true;
        } else {
            score += parseInt(value);
        }

        if (hasAce && score > 21) {
    score -= 10;
}
return score;
}

    




// makeDeck iuses loops to iterate each combination in the array to cover all 52 possible combinations to create the cardDeck array//

//DOM variables//
const playerHandElement = document.getElementById('player-hand');
const dealerHandElement = document.getElementById('dealer-hand');
const messageElement = document.getElementById('message');
const dealButton = document.getElementById('deal-button');
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');

//gamevariables//
const deck = getShuffledDeck();
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameInProgress = false;
let gameStarted = 
let gameOver = 

//eventlisteners to deploy//
dealButton.addEventListener('click', deal);
hitButton.addEventListener('click', hit);
standButton.addEventListener('click', stand);

