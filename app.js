var allImages = [
    "image1.jpg",
    "image1.jpg",
    "image2.jpg",
    "image2.jpg",
    "image3.jpg",
    "image3.jpg",
    "image4.jpg",
    "image4.jpg",
    "image5.jpg",
    "image5.jpg",
    "image6.jpg",
    "image6.jpg"
];

var numTries = 0;
var numMatches = 0;
var firstSelection = null;
var gameBoard = document.getElementById("game-board");
var startButton = document.getElementById("start-button");
var squares = [];

// Function to flip a square
function flipSquare() {
  // Check if the square is already flipped or if 2 squares are already selected
  if (this.getAttribute("data-matched") === "true" || firstSelection === this) {
    return;
  }

  // Flip the square and increment the number of tries
  this.style.backgroundImage = "url('" + allImages[squares.indexOf(this)] + "')";
  numTries++;

  // Check if this is the first or second square selected
  if (firstSelection === null) {
    firstSelection = this;
  } else {
    // Check if the two squares match
    if (allImages[squares.indexOf(firstSelection)] === allImages[squares.indexOf(this)]) {
      // Mark the squares as matched, increment the number of matches, and reset the first selection
      firstSelection.setAttribute("data-matched", "true");
      this.setAttribute("data-matched", "true");
      numMatches++;
      firstSelection = null;
    } else {
      // Hide the images after 1 second and enable the squares
      setTimeout(function() {
        firstSelection.style.backgroundImage = "";
        this.style.backgroundImage = "";
        firstSelection = null;
      }.bind(this), 1000);
    }
  }

  // Check if the game is over
  if (numMatches === 6 || numTries === 16) {
    // Show the game over message with the final score
    alert("Game Over! Your score is " + (numMatches * 5));

    // Disable all squares after the game is over
    for (var i = 0; i < squares.length; i++) {
      squares[i].removeEventListener("click", flipSquare);
      squares[i].style.cursor = "default";
    }
  }
}

// Create the squares and add click event listener to each square
for (var i = 0; i < 12; i++) {
  var square = document.createElement("div");
  square.classList.add("square");
  square.setAttribute("data-matched", "false");

  squares.push(square);
  gameBoard.appendChild(square);

  square.addEventListener("click", flipSquare);
}

// Function to start the game
function startGame() {
  // Reset the game variables
  numTries = 0;
  numMatches = 0;
  firstSelection = null;

  // Shuffle the images
  allImages.sort(function() { return 0.5 - Math.random() });

  // Reset the squares
  for (var i = 0; i < squares.length; i++) {
    squares[i].setAttribute("data-matched", "false");
    squares[i].style.backgroundImage = "";
  }

  // Enable all squares
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", flipSquare);
    squares[i].style.cursor = "pointer";
  }
}

// Add click event listener to the start button
startButton.addEventListener("click", startGame);
