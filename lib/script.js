// Add your code here
import KeywordArea from './keyword';

let keywordField = new KeywordArea();

let letters = Array(26).fill(1).map((el, idx) => {
  return String.fromCharCode(96 + el + idx).toUpperCase();
});

let lettersTable = document.getElementById("source-display");
let sourceOutput = document.getElementById("source");
let cipherOutput = document.getElementById("cipher");

buildLettersTable();
// fill table values
fillRegularLetter();
fillShiftedLetter(0);

// once keyword is updated, display source text with offset from first letter of keyword
keywordField.button.addEventListener("click", applyshift(0));

function applyshift(pointer) {
  return () => {
    clearOutput();
    let len = keywordField.currentKeyword.length;
    let shift;
    if(len === 0) {
      shift = 0;
    } else {
      let currentLetter = keywordField.currentKeyword[pointer % len];
      shift = letters.indexOf(currentLetter);
    }
    fillShiftedLetter(shift, true);
  };
}

// query after table is filled
let sourceButtons = document.querySelectorAll("#source-display tr td button");

sourceButtons.forEach((el, idx) => {
  el.addEventListener("click", () => {
    // get orginal letters from cell1
    sourceOutput.value += el.innerHTML;
    // get shifted letter from cell2
    // query here so that every time letters got shifted, we can get updated values for cipherOutput
    let shiftedVals = document.querySelectorAll("#source-display tr td span");
    cipherOutput.value += shiftedVals[idx].innerHTML;
  });
});

function buildLettersTable() {
  let rowNum = 2;
  for(let i = 0; i < rowNum; i++) {
    lettersTable.insertRow(i);
  }
}

function fillRegularLetter() {
  for(let j = 0; j < letters.length; j++) {
    let sourceLetter = lettersTable.rows[0];
    let cell1 = sourceLetter.insertCell(j);
    cell1.innerHTML = `<button>${letters[j]}</button>`;
  }
}

function fillShiftedLetter(shift, update=false) {
  for(let j = 0; j < letters.length; j++) {
    let shiftLetter = lettersTable.rows[1];
    let cell2;
    if(update) {
      cell2 = shiftLetter.cells[j];
    } else  {
      cell2 = shiftLetter.insertCell(j);
    }
    let newChar = caesarCipher(letters[j], shift);
    cell2.innerHTML = `<span>${newChar}</span>`;
  }
}

function caesarCipher(letter, shift) {
  let offset = (letter.charCodeAt(0) - "A".charCodeAt(0) + shift) % 26;
  let newLetter = String.fromCharCode(offset + "A".charCodeAt(0));

  return newLetter;
}

function clearOutput() {
  sourceOutput.value = "";
  cipherOutput.value = "";
}
