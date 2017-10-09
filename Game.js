function Game(word) {
  this.word = word;
  this.wordArray = this.word.split("");
  this.verify = this.word.split("");
  this.correctGuesses = 0;
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
  	if(test<0){
  		return(0);
  	}
  	while(test>=0){
  		displayArrayCurrent[test] = letter;
  		this.wordArray[test]="!";
      this.correctGuesses++;
		  test = this.wordArray.indexOf(letter);
  	}
    console.log("++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("++++++++++++++++++++++++++++++++++++++++++++++");
  	console.log(displayArrayCurrent);
    console.log("++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("++++++++++++++++++++++++++++++++++++++++++++++");
    if (this.correctGuesses==this.verify.length){
      return(1);
    }
  	return(displayArrayCurrent);
  };
}
module.exports = Game;