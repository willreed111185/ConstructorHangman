function Game(word) {
  this.word = word;
  this.wordArray = this.word.split("");
  this.displayArray = function(){
  	  let display = [];
	  	for (i=0;i<this.wordArray.length;i++){
	  		display.push("_")
	  	}
	  console.log(display);
	  return (display);
	}
  this.updateDisplayArray = function(letter,displayArrayCurrent){
  	let test = this.wordArray.indexOf(letter);
    console.log("TEST: ",test);
  	if(test<0){
      console.log("You Guessed Wrong");
  		return(0);
  	}
  	while(test>=0){
  		displayArrayCurrent[test] = letter;
  		this.wordArray[test]="!";
		  test = this.wordArray.indexOf(letter);
  	}
  	console.log(displayArrayCurrent);
  	return(displayArrayCurrent);
  };
}
module.exports = Game;