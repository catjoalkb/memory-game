/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-diamond', 
			 'fa-diamond', 
			 'fa-paper-plane-o',
			 'fa-paper-plane-o',
			 'fa-anchor',
			 'fa-anchor',
			 'fa-bolt',
			 'fa-bolt',
			 'fa-cube',
			 'fa-cube',
			 'fa-leaf',
			 'fa-leaf',
			 'fa-bicycle',
			 'fa-bicycle',
			 'fa-bomb',
			 'fa-bomb']

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const deck = document.querySelector('.deck');
const moves = document.querySelector('.moves');
const reflesh = document.querySelector('.fa-repeat');

let openedCards = []; // A list to hold opened cards
let lockedCards = []; // A list to hold locked cards
let counter = 0; 
deck.innerHTML = ""; // Clear all inner elements
moves.innerText = 0; // Clear moves

/*
QUESTION: How could I simplify above initializaztion
		  which already exists in function initialize
*/

initialize(); // Initialize the game

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function displayCard(card) {
	card.className = "card open show";
	card.innerHTML
}

function addOpenedCard(card) {
	openedCards.push(card);
}

function lockCards(card1, card2) {
	card1.className = "card match";
	card2.className = "card match";
	lockedCards.push(card1);
	lockedCards.push(card2);
}

function hideCards(card1, card2) {
	card1.className = "card";
	card2.className = "card";
}

function testIfWin(lockedCards) {
	if (lockedCards.length === 16) {
		alert(`Congratulations! You win with ${counter} moves!`)
	}
}

function initialize() { // Initialize 

	openedCards = []; 
	lockedCards = [];
	counter = 0;
	deck.innerHTML = "";
	moves.innerText = 0;

	cards = shuffle(cards); // Shuffle cards

	for (let i of cards) { // Create HTML element and add to the page
		let cardContainer = document.createElement('li');
		cardContainer.classList.add('card');

		let card = document.createElement('i');
		card.className = `fa ${i}`;

		cardContainer.appendChild(card);
		deck.appendChild(cardContainer);

}
}



function clicked(e) {
	// update counter
	counter += 1; 
	moves.innerText = counter;

	if (e.target.nodeName === 'LI') { //Check the target is the desired
		const clickedCard = e.target;
	displayCard(clickedCard);

		if (openedCards.length === 0) {
			addOpenedCard(clickedCard);

		} else {
			const thisCardClassName = clickedCard.children[0].className;
			const originalCard = openedCards.pop();
			const originalClassName = originalCard.children[0].className;

			if (thisCardClassName === originalClassName) { // Match
				lockCards(originalCard, clickedCard);
				testIfWin(lockedCards);

			} else {	// Not match
				setTimeout(function() {
					hideCards(originalCard, clickedCard)
				}, 500); // Wait 0.5 second before hiding cards
				
			}
		}

	}
}

deck.addEventListener('click', clicked);
reflesh.addEventListener('click', initialize);







