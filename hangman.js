const inquirer = require("inquirer");
const moment = require("moment-datetime");
const fs = require("fs");
const logFilePath = "log.txt";
const Game = require("./Game");
const gameWordsArray = ["california","florida","colorado","washington"];
let gameWord = gameWordsArray[Math.floor(Math.random() * gameWordsArray.length) + 0];
//console.log("GameWord: ",gameWord)
var gameWordObj = new Game(gameWord);
let currentDisplay = [];


function logIt(logNote){
	let timeStamp = moment().strftime("%m/%d/%y %I:%M %p");
	fs.appendFile(logFilePath, timeStamp+"  "+logNote+"\n", function(err) {
		if (err) {
			console.log(err);
		}
	});
}


function playHangman(){
	inquirer.prompt([
	    {
	      type: "list",
	      message: "Would you like to play the American State Hangman game?",
	      choices: ["Yes", "No", "Maybe"],
	      name: "trans"
	    }
	]).then(function(inquirerResponse) {
		switch(inquirerResponse.trans){
			case "No":
				logIt("Player didnt want to play.");
				break;
			case "Yes":
				logIt("Game Started: "+gameWord);
				console.log(gameWord);
				currentDisplay=gameWordObj.displayArray();
				gameRound(6);
				break;
			case "Maybe":
				logIt("Player doesn't know if they're capable.");
				break;
		}
	})
}

function gameRound(tries){
	if(tries==0){
		return
	};
	inquirer.prompt([
	    {
	      type: "input",
	      message: "Please Guess a letter",
	      name: "letterGuess"
	    }
	]).then(function(inquirerResponse) {
		let turn = gameWordObj.updateDisplayArray(inquirerResponse.letterGuess,currentDisplay);
		console.log("You guessed: "+inquirerResponse.letterGuess);
		if (turn==0){
			tries--;
		}else{
		currentDisplay = turn;	
		}
		gameRound(tries);
	})
}

playHangman();




//console.log(gameWordObj.word);
//console.log(gameWordObj.wordArray);

//var output = gameWordObj.displayArray();
//var gameTurn = gameWordObj.updateDisplayArray("o",output);
//console.log(gameTurn);

