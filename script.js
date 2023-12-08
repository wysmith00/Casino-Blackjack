let blackGame = {
    'player': {'scoreSpan': '#player-score', 'div': '#player-cards', 'score': 0, 'aces': 0},
    'dealer': {'scoreSpan': '#dealer-score', 'div': '#dealer-cards', 'score': 0, 'aces': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardMenu': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11]},
    'stay': false,
    'turnsOver': false
}
const dealer = blackGame['dealer']
const player = blackGame['player']


function deal() {
    if (blackGame['turnsOver'] === false) {
        blackGame['player']['score'] = 0;
        blackGame['dealer']['score'] = 0;

    document.querySelector(blackGame['player']['div']).innerHTML = '';
    document.querySelector(blackGame['dealer']['div']).innerHTML = '';

    const dealerFirstCard = randomCard();
    const dealerSecondCard = randomCard();
    showCard(dealerFirstCard, blackGame['dealer']);
    showCard(dealerSecondCard, blackGame['dealer']);
    updateScore(dealerFirstCard, blackGame['dealer']);
    updateScore(dealerSecondCard, blackGame['dealer']);
    showScore(blackGame['dealer']);

    if ((dealerFirstCard === 'A' && ['K', 'Q', 'J', '10'].includes(dealerSecondCard)) ||
        (dealerSecondCard === 'A' && ['K','Q', 'J', '10'].includes(dealerFirstCard))) {
        document.querySelector('#game-result').textContent = "Sorry, dealer has Blackjack.";
        document.querySelector('#game-result').style.color = 'black';
        blackGame['turnsOver'] = true;
        return;
        }
    
    for(let i = 0; i < 2; i++) {
        hit(blackGame['player']);
    }
}
}

 function checkBust(activePlayer) {
    if (activePlayer['score'] > 21) {
        return true;
    }
    return false;
}   

function hit(activePlayer) {
    if (blackGame['turnsOver'] === false) {
    let card = randomCard();
    showCard(card, activePlayer);
    updateScore(card, activePlayer);
    showScore(activePlayer);

    if (activePlayer === blackGame['player'] && activePlayer['score'] === 21) {
        endGame();
        showResults('player');
    } else if (activePlayer === blackGame['dealer'] && activePlayer['score'] === 21) {
        endGame()
        showResults('dealer');
    }
}
}
function stay() {
    if (blackGame['turnsOver'] === true) {
        blackGame['stay'] = true
        dealerTurn();
    }
    
    blackGame['stay'] = true;
    while (blackGame['dealer']['score'] < 17 && blackGame['stay'] === true) {
        let card = randomCard();
        showCard(card, dealer);
        updateScore(card, dealer);
        showScore(dealer);
    }

    blackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);

}
function start() {
    blackGame['stay'] = false;
    blackGame['turnsOver'] = false;
    document.querySelector('#game-result').textContent = '';
    deal();
}
function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    let cardDiv = document.createElement('div');
    cardDiv.innerText = card;
    document.querySelector(activePlayer['div']).appendChild(cardDiv);
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + blackGame['cardMenu'][card][1] <= 21) {
            activePlayer['score'] += blackGame['cardMenu'][card][1];
            activePlayer['aces'] += 1;
        } else {
            activePlayer['score'] += blackGame['cardMenu'][card][0];
        }
    } else {
        activePlayer['score'] += blackGame['cardMenu'][card];
    }
    while (activePlayer['score'] > 21 && activePlayer['aces'] > 0) {
        activePlayer['score'] -= 10;
        activePlayer['aces'] -= 1;
    }
}
function endGame() {
    let winner;
    if (blackGame['player']['score'] > 21) {
        winner = 'dealer';
    } else if (blackGame['player']['score'] === 21) {
        winner = 'player';
    } else if (blackGame['dealer']['score'] >= 17) {
        winner = computeWinner();
    }
    showResult(winner);
}
function computeWinner() {
    let winner;
     if (blackGame['player']['score'] > 21) {
        winner = 'dealer'
    } else if (blackGame['dealer']['score'] > 21) {
        winner = 'player';
    } else if (blackGame['player']['score'] > blackGame['dealer']['score']) {
        winner = 'player';
    } else if (blackGame['player']['score'] < blackGame['dealer']['score']) {
        winner = 'dealer';
    } else {
        winner = 'draw';
    }
    return winner;
}

function showResult(winner) {
    let message, color;
    if(winner === 'player') {
        message = 'WINNER WINNER CHICKEN DINNER';
        color = 'gold';
    } else if (winner === 'dealer') {
        message = 'Dealer has the better hand, you lose';
        color = 'black';
    } else if (winner === 'draw') {
        message = 'It is a tie! Both players have the same score';
        color = 'gray';
    }
    document.querySelector('#game-result').textContent = message;
    document.querySelector('#game-result').style.color = color;
}


function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = "That is a Bust";
        document.querySelector(activePlayer['scoreSpan']).style.color = 'white';
        blackGame['turnsOver'] = true;
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
        if (blackGame['turnsOver']) {
            blackGame['turnsOver'] = false;
        }
    }
}

function dealerTurn() {
    while (blackGame['dealer']['score'] < 17) {
        let card = randomCard();
        showCard(card, blackGame['dealer']);
        updateScore(card, blackGame['dealer']);
        showScore(blackGame['dealer']);
    }
    let winner = computeWinner();
    showResult(winner);
}
document.querySelector('#hit-button').addEventListener('click', () => hit(player));
document.querySelector('#stay-button').addEventListener('click', () => stay(dealer));
document.querySelector('#start-button').addEventListener('click', start);
