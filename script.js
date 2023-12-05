
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
        if (value === "J" || value === "Q" || value == "K") {
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
calculateScore();
updateUI();
}
//check for blackjack//
function checkForBlackjack() {
    if (playerScore === 21) {
        console.log("WINNER WINNER CHICKEN DINNER, THATS A BLACKJACK");
        endRound();
    } else if (dealerScore === 21) {
        console.log("Dealer has Blackjack, Game Over");
        endRound();
    }
function updateUI() {
//shows the players hand//
    playerHandElement.textContent = "Player Hand: " + playerHand.join(", ");
const visableDealerHand = gameInProgress ? [dealerHand[0], "?"] : dealerHand;
dealerHandElement.textContent = "Dealers Hand: " + visableDealerHand.join(", ");
//scores are shown//
document.getElementById("player-score").textContent = "Player Score: " + playerScore;
document.getElementById("dealer-score").textContent = "Dealer Score: " + dealerScore;
//Game Message shown//
if(gameOver) {
    if(playerScore > 21) {
        messageElement.textContent = "Thats a bust, Game Over";
    } else if (dealerScore > 21) {
        messageElement.textContent = "Dealer busts, YOU WIN";
    } else if (playerScore > dealerScore) {
        messageElement.textContent = "Congrats you won!";
    } else if (playerScore < dealerScore) {
        messageElement.textContent = "Dealer has high card, you lose";
    } else if (playerScore === dealerScore) {
        messageElement.textContent = "Thats a push, tie game";
    }
} else if (gameInProgress) {
    messageElement.textContent = "pssst...you are in a game still";
} else {
    messageElement.textContent = "Click 'Deal' to try your luck again";
}

function endRound() {
    gameInProgress = false;
    gameOver = true;
}
calculateScores();
updateUI();
  
let gameStarted = false;
let gameOver = false;
// makeDeck iuses loops to iterate each combination in the array to cover all 52 possible combinations to create the cardDeck array//

//DOM variables//
const playerHandElement = document.getElementById('player-hand');
const dealerHandElement = document.getElementById('dealer-hand');
const messageElement = document.getElementById('message');
const dealButton = document.getElementById('deal-button');
const hitButton = document.getElementById('hit-button');
const stayButton = document.getElementById('stay-button');

//gamevariables//
let deck = getShuffledDeck();
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameInProgress = false;

//eventlisteners to deploy//
dealButton.addEventListener('click', deal);
hitButton.addEventListener('click', hit);
stayButton.addEventListener('click', stay);

