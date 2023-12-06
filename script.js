let blackGame = {
    'player': {'scoreSpan': '#player-score', 'div': '#player-cards', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-score', 'div': '#dealer-cards', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardMenu': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11]},
}

document.querySelector('deal-button').addEventListener('click', deal)
document.querySelector('hit-button').addEventListener('click', hit);
document.querySelector('stand-button').addEventListener('click', dealerTurn);
document.querySelector('start-button').addEventListener('click', start);

function hit() {
    let card = randomCard();
    showCard(card, PLAYER);
    updateScore(card, PLAYER);
    showScore(PLAYER);
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    let cardImage= documet.createElement('img');
    cardImage.src = 'images/${card.png';
    document.querySelector(activePlayer['div']).appendChild(cardImage);
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + blackGame['cardsMenu'][card][1] <= 21) {
            activePlayer['score'] += blackGame['cardsMenu'][card][1];
        } else {
            activePlayer['score'] += blackGame['cardsMenu'][card];
        }
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textConet
    }
}