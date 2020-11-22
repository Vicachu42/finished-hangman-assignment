const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgainButton = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const words = [
    "procrastination",
    "ox",
    "redundant",
    "supercalifragilisticexpialidocious",
    "Slovenia",
    "avatar",
    "tanuki",
    "python",
    "academy",
    "quiet",
    "polkadot",
    "effort",
    "portal",
    "cyanide",
    "monster",
    "hue" 
]

const correctLetters = [];
const wrongLetters = [];

function getRandomWord() {
    let result = words[Math.floor(Math.random() * words.length)];
    console.log(result);
    return result;
}

let generatedWord = undefined;
let playable = true;

function initializeGameState() {
    playable = true;
    generatedWord = getRandomWord();

    correctLetters.splice(0);
    wrongLetters.splice(0);

    popup.style.display = 'none';

    wordElement.innerHTML = makeHiddenWord(generatedWord, correctLetters).split('').map(key => `
        <span class="key">
            ?
        </span>
    `).join('');

    wrongLettersElement.innerHTML = '';
    document.querySelector('figure').classList.remove('scaffold');
    document.querySelector('figure').classList.remove('head');
    document.querySelector('figure').classList.remove('body');
    document.querySelector('figure').classList.remove('arms');
    document.querySelector('figure').classList.remove('legs');
}

function displayWord() {
    let newHiddenWord = makeHiddenWord(generatedWord, correctLetters);
    wordElement.innerHTML = newHiddenWord.split('').map(key => `
        <span class="key">
            ${key}
        </span>
        `).join('');
     
    if(hasPlayerWon(newHiddenWord, generatedWord)) {
        console.log('You won!');
        finalMessage.innerText = 'Congratulations, you won!';
        popup.style.display = 'flex';

        playable = false;
    }
}

function makeHiddenWord(wordToGuess, guessedLetters) {
    let result = "";

    for (let i = 0; i < wordToGuess.length; i++) {
        if(guessedLetters.includes(wordToGuess[i])) {
            result += wordToGuess [i];
        } else {
            result += "?";
        }
    }
    return result;
}

function hasPlayerWon(generatedWord, displayWord) {
    return generatedWord === displayWord;
}

function updateWrongLettersElement() {
    wrongLettersElement.innerHTML = `
    ${wrongLetters.length > 0 ? '<p> Wrong letters </p>' : ''}
    ${wrongLetters.map(key => `<span class="wrongLetter">${key}</span>`)}
    `;

    const errors = wrongLetters.length;
    if(errors === 1) {
        document.querySelector('figure').classList.add('scaffold');
    }
    else if (errors === 2){
        document.querySelector('figure').classList.add('head');
    }
    else if (errors === 3){
        document.querySelector('figure').classList.add('body');
    }
    else if (errors === 4){
        document.querySelector('figure').classList.add('arms');
    }
    else if (errors === 5){
        document.querySelector('figure').classList.add('legs');
        
        console.log('You lost!');
        finalMessage.innerText = 'You lost! \n The correct word was: \n' + generatedWord;
        popup.style.display = 'flex';

        playable = false;
    }
    else {
        console.log("antal fel gissningar: " + errors);
    }    
}

document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    document.addEventListener('keydown', event => {
        const charList = 'abcdefghijklmnopqrstuvwxyz';
        const key = event.key.toLowerCase();
    if (charList.indexOf(key) === -1) {
        console.log("ignoring keypress:", key);
        return;
    }

    console.log(key);

    if(generatedWord.includes(key)) {
        if(!correctLetters.includes(key)) {
            correctLetters.push(key);

            displayWord();
        } else {
            console.log('Wrong letter');
        }
    } else {
        if(!wrongLetters.includes(key)) {
            wrongLetters.push(key);

            console.log('Push to wrong letters')
            updateWrongLettersElement();
        }
    }
    });
}); 

playAgainButton.addEventListener('click', () => {
    initializeGameState();
    popup.style.display = 'none';
});

initializeGameState();