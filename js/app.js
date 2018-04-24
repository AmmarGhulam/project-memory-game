let card = document.getElementsByClassName("card");
let cards = [...card];
const stars = document.querySelectorAll(".fa-star");
let matchedCard = 0;
let moves = 0;
var openedCards = [];
let restr = document.querySelector(".restart");
restr.addEventListener("click",restart);
let counter = document.querySelector(".moves");
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
const deck = document.querySelector(".deck");
var shuffledCards = shuffle(cards);
function startTimer(){// start the timer for the game
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        if(matchedCard < 8)
        	second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}
	
function restart(){// reload the page	
	//location.reload();
		for (let i = 0; i < cards.length; i++){
					cards[i].classList.remove("show", "open","match");
				};
		second = 0, minute = 0; hour = 0; moves=0; openedCards = []; matchedCard = 0;
		counter.innerHTML = moves;		
		cards = shuffle(cards);
		shuffleCards();
		for(let i= 0; i < 3; i++){
            stars[i].style.visibility = "visible";
         }
}
window.onload = startGame();


var displayCard = function (){// when click toggle the cards
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

function startGame(){
	// add lestiner to every card that will call openYad(),displayCard() and finish()
	for (var i = 0; i < cards.length; i++){
		cards[i].addEventListener("click", compare);
		cards[i].addEventListener("click", displayCard);
		cards[i].addEventListener("click",finish);
	};
	shuffleCards();// deck of all cards in game
	startTimer();
}

function compare(){
// when 2 card selected it will check its type
	openedCards.push(this);
    var len = openedCards.length;
		if(len === 2){
			if(openedCards[0].type === openedCards[1].type){
				matched();
				moveCounter()
			} else {
				unmatched();
				moveCounter()
			}
		}
}

function displayCard(){
	this.classList.toggle("open");
	this.classList.toggle("show");
}
  
  function matched(){
				openedCards[0].classList.add("match");
				openedCards[0].classList.remove("show", "open");
				openedCards[1].classList.add("match");
				openedCards[1].classList.toggle("open");
				openedCards[1].classList.toggle("show");
				openedCards = [];
				matchedCard=matchedCard+1;
}

function unmatched(){//for when cards don't match
				openedCards[0].classList.toggle("unmatch");
				openedCards[1].classList.toggle("unmatch");
				disable()
				setTimeout(function(){// to make the user see the card before it close
				openedCards[0].classList.toggle("show");
				openedCards[1].classList.toggle("show");
				openedCards[0].classList.toggle("open");
				openedCards[1].classList.toggle("open");
				openedCards[0].classList.toggle("unmatch");
				openedCards[1].classList.toggle("unmatch");
				openedCards = [];
				disable()
    },500); 
}

function moveCounter(){    
    moves++;    
    counter.innerHTML = moves;
	if(moves > 17 && moves < 20){//2 stars
		for(let i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
	}else if ( moves >= 20){// 1 star
        for(let i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }	
}

function disable(){//user can not click on any cards
	for (var i = 0; i < cards.length; i++){
					cards[i].classList.toggle("disable");
				};
}

function finish(){// finish or not
	if (matchedCard == 8){
		finalTime = timer.innerHTML;
		var starRating = document.querySelector(".stars").innerHTML;
		document.querySelector(".congrats").innerHTML ="...Congratulations... You got"+starRating+" stars  with "+moves+" moves your time is "+finalTime;
		congrats();
	}
}

// function congrats(){
// 	for (let i = 0; i < cards.length; i++){
// 					cards[i].style.visibility = "hidden";
// 				};
//         var starRating = document.querySelector(".stars").innerHTML;
//         //showing move, rating, time on modal
//         document.querySelector(".deck").innerHTML 
// 		="...Congratulations... You got"+starRating+" stars  with "+moves+" moves your time is "+finalTime;
		
// }
function shuffleCards(){
	   for (var i= 0; i < shuffledCards.length; i++){
      [].forEach.call(shuffledCards, function(item){
         deck.appendChild(item);
      });
   }
}


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

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function congrats() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}