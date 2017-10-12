const readlineSync = require('readline-sync');

// this array holds all the possible words that can be the answer
// feel free to change the words here to words you find interesting! :)

let words = [
	'buzzard',
	'anchor',
	'drumlin',
	'wither',
	'ornery',
	'ligament',
	'fracture',
];

let answer; 
let nWrong; 
let pastGuesses = [];
let pastGames = [];
let cont = true;

class Game {
	constructor(answer, guesses, wrong, win){
		this.answer=answer;
		this.pastGuesses=guesses;
		this.nWrong=wrong;
		this.win=win;
	}
}
/*
PART 1

Write the pseudocode that represents your game logic here.
start:
	choose word
	give number of letters to player
	ask for guess
Guess:
	if guess is a new letter:
		add it to the list of guesses
	else:
		get a new guess
	if it is not in the word:
		add to number of wrong guesses
Update:
	show the hangman based on the new number of errors
	show the list of guessed letters
	show the secret with guessed letters revealed.
	if the man is hung:
		game over;
	else:
		next guess
Game End:
	Tell they player the man is dead
	its their fault;
	he had a family and friends,
	they were counting on you.
	ask if they want to "play" again
	yes: start
	no: good, close
*/

function startGame() {
	setUpGame();
	while (!checkGameOver()) {
		printGameState();
		const guess = readlineSync.question("please enter a guess: ");
		console.log('guess is', guess);
		
		if(pastGuesses.indexOf(guess)>=0){
			console.log("That letter was already guessed")
		} else {
			pastGuesses.push(guess);
			if(answer.indexOf(guess)<0){
				nWrong+=1;
			}
		}
	}
	console.log("its over")
	printGameState();

	let win;
	if (nWrong>=6){
		console.log("you lose, and should feel bad")
		win=false;
	}
	else {
		console.log("You Win")
		win=true;
	}
	let game= new Game(answer,pastGuesses,nWrong,win)
	
	pastGames.push(game);
}

function checkGameOver(){
	// WRITE CODE FOR PART 3 BELOW
	let boo_Complete=true;
	let boo_guessesLeft=false;
	const NUM_GUESSES=6;
	for (let i=0;i<answer.length;i++){
		if(pastGuesses.indexOf(answer[i])<0){
			boo_Complete=false;
		}
	}
	if(nWrong>=NUM_GUESSES){
		boo_guessesLeft=true;
	}
	console.log(nWrong);
	return (boo_guessesLeft||boo_Complete); 
}

function printGameState(){
	//Add a console.log here to print the previous guesses.

	console.log(pastGuesses);
	console.log('\n');
	let str = "";
	
	// for each letter in the target word
	for(let i = 0; i < answer.length; i++){
		let found = false;
		// loop through the pastGuesses
		for(let j = 0; j < pastGuesses.length; j++){
			// and check each element of past guesses to see if it matches the
			if(answer[i] === pastGuesses[j]){
				found = true;
			}
		}
		if(found){
			str += answer[i];
			str += "\t";
		}
		else{
			str += "_\t";
		}
	}
	console.log(str);
		
	console.log('\n');
	printHangMan(nWrong);	
	console.log('\n\n');
}

/* 
 =========================================================================================
 	Below are functions that may help with your logic, but do not need any modification
 =========================================================================================
*/

function getRandomWord(){
	const index = Math.floor(Math.random()*words.length);
	return words[index];
}

function printHangMan(nWrong){
	//Don't worry about the syntax you see here.  The ? operator is a succinct way to write an
	//if statement that has two results. Think of it as:
	// statement_that_is_true_or_false ? happens_if_true : (OR) happens_if_false 
	const headSpot = (nWrong > 0) ? "O" : " ";
	const bodySpot = (nWrong > 1) ? "|" : " ";
	const leftArm = (nWrong > 2) ? "/": " ";
	const rightArm = (nWrong > 3) ? "\\" : " ";
	const leftLeg = (nWrong > 4) ? "/" : " ";
	const rightLeg = (nWrong > 5) ? "\\" : " ";
	
	let str = "";
	console.log(" ___ ");
	console.log(" |  | ");
	console.log(" |  " +  headSpot + " ");
	console.log(" | " + leftArm + bodySpot + rightArm);
	console.log(" | " + leftLeg + " " + rightLeg);
	return;
}

function setUpGame(){
	// choose a new word
	answer = getRandomWord().split('');
	// reset the total of wrong guesses
	nWrong = 0;
	// empty our array of previously guessed letters
	pastGuesses = []; 
}

startGame()

while(cont){
	let answer = readlineSync.question('Would you like to play again? y/n')
	if(answer.toLowerCase() === 'y'){
		startGame();
	}
	else if(answer.toLowerCase() === 'n'){
		cont = false;
		console.log('Good game!')
	}
	else {
		console.log('Please enter either y (yes) or n (no).')
	}
}
