let imageBox = document.getElementById("imageBox");
let inputBox = document.getElementById("inputBox");
let submitButton = document.getElementById("submitButton");
let randomWordButton = document.getElementById("randomWordButton");
let guessedLettersParagraph = document.getElementById("guessedLettersParagraph");
let resultParagraph = document.getElementById("resultParagraph");
let squares = document.querySelectorAll(".square");
let blankBoxes = document.getElementById("blankBoxes");

let fails = 0;
let word;
let alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let boxesArray = [];
let gameOver = false;

submitButton.addEventListener("click", submitWord);
randomWordButton.addEventListener("click", selectRandomWord);

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", pickLetter);
}

for (let i = 0; i < squares.length; i++) {
  squares[i].innerHTML = alphabetArray[i];
}

function submitWord() {
  word = inputBox.value;
  showGame();
}

function selectRandomWord() {
  let randomWordArray = ["apple", "orange", "peach"];
  word = randomWordArray[Math.floor(Math.random() * randomWordArray.length)];
  showGame();
}

function showGame() {
  inputBox.style.display = "none";
  submitButton.style.display = "none";
  randomWordButton.style.display = "none";
  imageBox.style.backgroundImage = "url('stages/0.png')";
  squareContainer.style.display = "block";
  imageBox.style.display = "block";
  blankBoxes.style.display = "block";

  for (let i = 0; i < word.length; i++) {
    //create a div in outer space and make it equal to a new variable
    let box = document.createElement("div");
    //add box to array you created
    boxesArray.push(box);
    //add class to the div you named boxes
    box.classList.add("blank");
    //take div you named boxes and place it in the blankboxes element.
    blankBoxes.appendChild(box);
  }
}

function pickLetter() {
  if (gameOver == false && !this.classList.contains("used")) {
    let letterExists = false;
    this.classList.add("used");
    for (let i = 0; i < word.length; i++) {
      if (this.innerHTML == word[i]) {
        boxesArray[i].innerHTML = this.innerHTML;
        letterExists = true;
      }
    }

    //If every letter in the innerHTML of boxesArray is equal to every letter in word array, then say: You Win!
    //What is boxesArray? An array of elements
    //What is word? A variable
    if (boxesArray.innerHTML == word) {
      resultParagraph.innerHTML = "You Win!";
      gameOver = true;
    }

    else if (letterExists == false) {
      fails = fails + 1;
      updateImage();

      if (fails == 7) {
        for (let i = 0; i < word.length; i++) {
          if (boxesArray[i].innerHTML == "") {
            boxesArray[i].innerHTML = word[i];
            boxesArray[i].style.color = "red";
            //QUESTION: Why doesn't the code above make all letters red, even the ones that were already guessed?
          }
        }
      }
    }
  }
}

function updateImage() {
  imageBox.style.backgroundImage = "url('stages/" + fails + ".png')";
}


// TODO: Make program say "You Win!"