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
const timer = document.querySelector('.timer');
const stars = document.querySelector('.stars');
const star2 = stars.children[1]; // the second star
const star3 = stars.children[2]; // the third star

let openedCards; // A list to hold opened cards
let lockedCards; // A list to hold locked cards
let counter; // A counter to count moves
let timeUsedValue; // A string to show time used
let ifWin; // A flag to reflect if win
let ifTimeStarted; // A flag to reflect if time started
let startTime;  // Store start time
let numStar; // Number of stars left
let timeUpdateId; // Id for time update interval

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
		ifWin = true;
		let strStar; 
		switch(numStar) {
			case 1:
				strStar = "★ star";
				break;
			case 2:
				strStar = "★★ stars";
				break;
			case 3:
				strStar += "★★★ stars";
				break;
		}
		setTimeout(function() {
			alert(`Congratulations! You've won ${strStar} with ${counter} moves in ${timeUsedValue}!`);
		}, 500); // Delay 0.5 sec to show after the last card shows
	}
}

function startTimeRecord() {
	ifTimeStarted = true;
	startTime = new Date().getTime();
	GameTimer();
}

function initialize() { // Initialize 

	openedCards = []; 
	lockedCards = [];
	counter = 0;
	deck.innerHTML = ""; // Clear all inner elements
	moves.innerText = 0; // Clear moves
	ifWin = false;
	numStar = 3;
	ifTimeStarted = false;
	timer.innerText = '0 hours 0 mins 0 secs'; 

	if (timeUpdateId) { // Clear interval if exists
		clearInterval(timeUpdateId)
	}

	cards = shuffle(cards); // Shuffle cards

	for (let i of cards) { // Create HTML element and add to the page
		let cardContainer = document.createElement('li');
		cardContainer.classList.add('card');

		let card = document.createElement('i');
		card.className = `fa ${i}`;
		cardContainer.appendChild(card);
		deck.appendChild(cardContainer);

		star3.firstElementChild.className = "fa fa-star"; // reset stars
		star2.firstElementChild.className = "fa fa-star";

	}
}

function updateStars(counter) { //Update number of stars according to counter

	if (counter <= 10) {
		numStar = 3;

	} else if (counter <= 15) {
		star3.firstElementChild.className = "fa fa-star-o";
		numStar = 2;

	} else {
		star2.firstElementChild.className = "fa fa-star-o";
		numStar = 1;
	}
}

function GameTimer() { // Show time used on the page. Reference to reviewer's tips

	timeUpdateId = setInterval(function() {
		if (!ifWin) {
			let currentTime = new Date().getTime();
			let timeUsed = currentTime - startTime;
			let hrs = Math.floor((timeUsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			let mins = Math.floor((timeUsed % (1000 * 60 * 60)) / (1000 * 60));
			let secs = Math.floor((timeUsed % (1000 * 60)) / 1000);

			timeUsedValue = `${hrs} hours  ${mins} mins  ${secs} secs`;
			timer.innerText = timeUsedValue;
		}
	}, 1000); // Reflesh every second

}


function clicked(e) {
	//Check the target is the desired: list element and not already matched or opened
	if (e.target.nodeName === 'LI' 
		& e.target.className != "card match"
		& e.target.className != "card open show") {

		if (!ifTimeStarted) { // Test if the first time to click the card
			startTimeRecord()
		}

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

			// update counter
			counter += 1; 
			moves.innerText = counter;

			// update stars
			updateStars(counter);
		}

	}
}

deck.addEventListener('click', clicked);
reflesh.addEventListener('click', initialize);







