let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let suits = ["Diamonds", "Spades", "Hearts", "Clubs"];
// adding the card deck and shuffle feature //
funciton makeDeck()
    let deck = [];

    for (let suit of suits) {
        for (let value of values) {
            deck.push('${value}' of '${suit}');
        }
    }

    return deck;
}

let cardDeck = makeDeck();
// makeDeck iuses loops to iterate each combination in the array to cover all 52 possible combinations to create the cardDeck array//
 