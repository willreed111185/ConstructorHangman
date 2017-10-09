const inquirer = require("inquirer");
const moment = require("moment-datetime");
const fs = require("fs");
const logFilePath = "log.txt";
const Game = require("./Game");
const gameWordsArray = ["california","florida","colorado","washington", "newyork","virginia","georgia","montana"];
let gameWordObj = {};
let gameWord="";
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
				process.exit();
				break;
			case "Yes":
				currentDisplay=[];
				gameWord = gameWordsArray[Math.floor(Math.random() * gameWordsArray.length) + 0];
				gameWordObj = new Game(gameWord);
				logIt("Game Started: "+gameWord);
				console.log("++++++++++++++++++++++++++++++++++++++++++++++");
				console.log("++++++++++++++++++++++++++++++++++++++++++++++");
				//console.log(gameWord);
				currentDisplay=gameWordObj.displayArray();
				console.log("++++++++++++++++++++++++++++++++++++++++++++++");
				console.log("++++++++++++++++++++++++++++++++++++++++++++++");
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
		console.log("==================");
		console.log("==================");
		console.log("You Lost That Game");
		console.log("==================");
		console.log("==================");
		logIt("GameOver: ",gameWordObj.word);
		playHangman();
		return;
	};
	inquirer.prompt([
	    {
	      type: "input",
	      message: "Please Guess a letter:",
	      name: "letterGuess"
	    }
	]).then(function(inquirerResponse) {
		let turn = gameWordObj.updateDisplayArray(inquirerResponse.letterGuess,currentDisplay);
		console.log("You guessed: "+inquirerResponse.letterGuess);
		if (turn==0){
			let test = gameWordObj.verify.indexOf(inquirerResponse.letterGuess);
			if (test==-1){
				tries--;
				console.log("====================================");
				console.log("====================================");
				console.log("You Guessed Wrong: Only "+ tries + " Tries Left");
				console.log("====================================");
				console.log("====================================");
				logIt("Wrong Guess: "+inquirerResponse.letterGuess);
			}else{
				console.log("========================");
				console.log("========================");
				console.log("You Already Guessed That");
				console.log("========================");
				console.log("========================");
				logIt("Repeat Guess: "+inquirerResponse.letterGuess);
			}
		}
		else if (turn==1){
			console.log("==================");
			console.log("==================");
			console.log("You Win That Round");
			console.log("==================");
			console.log("==================");
			logIt("Round Won");
			playHangman();
			return;
		}else{
		currentDisplay = turn;	
		}
		gameRound(tries);
	})
}

playHangman();

