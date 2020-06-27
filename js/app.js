//==============================================HANGMAN GAME ====================================================
//variables pour les mots 
let nomsDieu = ["allah", "ar-rahman", "ar-rahim", "al-malik", "al-qouddous", "as-salam",
  "Al-mou'min", "Al-mouhaymin", "Al-aziz", "al-djabbar", "al-hafizh", "al-khaliq", "al-ghafour", "al-mousawwir",
  "Al-fattah", "Al-qahhar",	"Al-wahhab", "Ar-razzaq",	"Al-latif", "Al-aliyy", "Al-mou-akhkhir",	"Al-basit",	
  "Al-mou-izz", "Al-basir", "Al-khabir", "al-alim", "Al-mouqit", "Al-mouzhill", "Al-qabiz", "Al-khafiz",	
  "Al-ghaffar", "Al-hakam",	"Ar-rafi", "Al-adl",	"Al-bari", "Ash-shakour",	"Al-halim",	"As-sami", "Azim",	
  "Al-mouqit", "Al-hasib",	"Al-djalil",	"Al-karim",	"Ar-raqib",	"Al-moujib", "Al-wasi", "Al-hakim",	"Al-wadoud",	"Al-madjid", "Al-ba-is"
];

const nomsVoiture = ["toyota", "mercedez", "mazda", "alfa-romeo", "bugatti"];

let answer = ' ';
let maxWrong = 10;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

//fonction aléatoire dans le choix des mots
function randomWord() {
  answer = nomsDieu[Math.floor(Math.random() * nomsDieu.length)];
}
//clavier
function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

//affichage des images en cas d'erreur
function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.JPG';
}

//Message au cas ou on trouve le mots
function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'Vous avez gagné!!!';
  }
}

//Message en cas de fausse reponse
function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'le résultat est: ' + answer;
    document.getElementById('keyboard').innerHTML = 'Vous avez perdu !!!';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.JPG';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
//=============================================== AHS ======================================================