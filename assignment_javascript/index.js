    //const readlineSync = require('readline-sync');

    // this array holds all the possible words that can be the answer
    // feel free to change the words here to words you find interesting! :)

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
$(document).ready(function(){
    var baseBody=document.body;
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

    var letterBlockVowels=$(".letters .vowels");
    var letterBlockConsonants=$(".letters .consonants");
    var again=$(".again");
    setUpGame();
    var lettersAvail=$(".letter");
    var lettersUsedBlock = $(".used")
    printGameState();
    console.log(answer);

    $(".again .y").click(function(){
        setUpGame();
    })
    $(".again .n").click(function(){
        window.location.href="http://33.media.tumblr.com/343c77e660a14114ed923e782d4bba95/tumblr_ncw5u3imvW1sliirlo1_250.gif"
    });
    
function guess(letter){
    
		console.log('guess is', letter);
		
		if(pastGuesses.indexOf(letter)>=0){
			console.log("That letter was already guessed")
		} else {
            pastGuesses.push(letter);
			if(answer.indexOf(letter)<0){
                nWrong+=1;
			}
		}
}

function checkGameOver(){
	// WRITE CODE FOR PART 3 BELOW
	var boo_Complete=true;
	var boo_guessesLeft=false;
	var NUM_GUESSES=6;
	for (var i=0;i<answer.length;i++){
		if(pastGuesses.indexOf(answer[i])<0){
			boo_Complete=false;
		}
	}
	if(nWrong>=NUM_GUESSES){
		boo_guessesLeft=true;
	}
	return (boo_guessesLeft||boo_Complete); 
}

function printGameState(){
	//Add a console.log here to print the previous guesses.

	//console.log(pastGuesses);
    // console.log('\n');
    console.log(pastGuesses);
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
    $(".hint").text(str);
        
    if(checkGameOver()){
        var win;
        $(".letter").off("click");
        $(".div-letter").remove()
        $(".guessed").remove()

        $(".cons,.vows").hide();
        $(".used-box").hide();
        again.fadeIn(300);
        win=(nWrong<6);
        let header=$(".again h2");
        header.text((win) ? "You win..." : "You lose...")
        header.css( (win) ? {"font-family":"'Rye', cursive","color":"black"} : {"font-family":"'Nosifer', cursive","color":"red"})
        
        var game= new Game(answer,pastGuesses,nWrong,win)
        
        pastGames.push(game);
        var len=pastGames.length;
        // $(".past").append("<div class=\"past-game\"><h4>Game "+len+":</h4><h5>Guesses</h5> )
    }
    imgHangMan(nWrong);
	// console.log('\n');
	// printHangMan(nWrong);	
	// console.log('\n\n');
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

function imgHangMan(wrong){
    $(".hungman").attr("src","./images/Hangman-"+wrong+".png");
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
    again.hide();
    $(".cons,.vows").show();
    $(".used-box").show();
    $(".div-letter").remove()
    $(".guessed").remove()
	answer = getRandomWord().split('');
	// reset the total of wrong guesses
	nWrong = 0;
	// empty our array of previously guessed letters
    pastGuesses = []; 
    
    var char ="a";
    for(var i=0;i<26;i++){
        if((char==="a")||(char==="e")||(char==="i")||(char==="o")||(char==="u")){
            letterBlockVowels.append("<div class=\" div-letter \" ><div name=\""+char+"\" class=\"letter\"><img class=\"speech\" src=\"./images/letter.png\"><h4 class=\" vowel \" >"+char+"</h4></div></div>")
        } else {
            letterBlockConsonants.append(("<div class=\" div-letter \" ><div name=\""+char+"\" class=\"letter\"><img class=\"speech\" src=\"./images/letter.png\"><h4 class=\" consonant \">"+char+"</h4></div></div>"))
        }
        char=nextChar(char);
    }
    
    lettersAvail=$(".letter");
    lettersAvail.on("click", function(){
        var thisGuess=$(this).attr("name");
        $(this).addClass("guessed").removeClass("letter");
        $(this).off("click");
        $(this).detach();
        lettersUsedBlock.append($(this));
        guess(thisGuess);
        printGameState();
    });
    printGameState();
}

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

// /////// Non Game stuff /////////
let light=$(".dynamic-shadow")

let base=light.width();
f_out();
function f_out(){
    setTimeout(function(){
        light.animate({width:"-=1vw","margin-top":"+=0.5vw"},{duration:Math.floor(Math.random()*200)+600,complete:f_in})
    },Math.floor(Math.random()*500));
}

function f_in(){
    setTimeout(function(){
        light.animate({width: "+=1vw","margin-top":"-=0.5vw"},{duration:Math.floor(Math.random()*300)+400,complete:f_out})
    },Math.floor(Math.random()*500));
}
});