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

    for(let i = 0; i < 2; i++) {
        hit(blackGame['player']);
        hit(blackGame['dealer']);
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
    if (checkBust(activePlayer)) {
        blackGame['turnsOver'] = true;
        showResult('dealer');
    } else {
        endGame();
        }
    }
}
function stay(activePlayer) {
    if (blackGame['turnsOver'] === false) {
        dealerTurn();
    }
    blackGame['stay'] = true;
    while (blackGame['dealer']['score'] < 17 && blackGame['stay'] === true) {
        let card = randomCard();
        showCard(card, activePlayer);
        updateScore(card, activePlayer);
        showScore(activePlayer);
    }

    blackGame['turnsOver'] = true;
    dealerTurn();

    let winner = computeWinner()
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
    if (activePlayer['score'] > 21 && activePlayer['aces'] > 0) {
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
    showResult(winner);}

function showResult(winner) {
    let message, color;
    if(winner === 'player') {
        message = 'WINNER WINNER CHICKEN DINNER, YOU WON';
        color = 'gold';
    } else if (winner === 'dealer') {
        message = 'dealer has high card, you lose';
        color = 'black';
    }
    document.querySelector('#game-result').textContent = message;
    document.querySelector('#game-result').style.color = color;
}


function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST!";
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
    while(blackGame['dealer']['score'] < 17) {
        let card = randomCard();
        showCard(card, blackGame['dealer']);
        updateScore(card, blackGame['dealer']);
        showScore(blackGame['dealer']);
    }
    let winner = computeWinner();
    showResult(winner);
}
document.querySelector('#deal-button').addEventListener('click', deal);
document.querySelector('#hit-button').addEventListener('click', () => hit(player));
document.querySelector('#stay-button').addEventListener('click', () => stay(dealer));
document.querySelector('#start-button').addEventListener('click', start);