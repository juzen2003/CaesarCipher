// Add your code here
// keyword area
import KeywordArea from './keyword';
let keywordField = new KeywordArea();

let letters = Array(26).fill(1).map((el, idx) => {
  return String.fromCharCode(96 + el + idx).toUpperCase();
});

// once keyword is updated, update source text table with offset
keywordField.button.addEventListener("click", initshift);

// source text & cipher text area
let lettersTable = document.getElementById("source-display");
let sourceOutput = document.getElementById("source");
let cipherOutput = document.getElementById("cipher");
let clearButton = document.getElementById("clear");
// clear Source Text & Cipher Text
clearButton.addEventListener("click", clearOutput);

// init source text table
buildLettersTable();
fillRegularLetter();
fillShiftedLetter(0);

// query after table is filled
let sourceButtons = document.querySelectorAll("#source-display tr td button");

// user can select and input source text
sourceButtons.forEach((el, idx) => {
  el.addEventListener("click", () => {
    sourceOutput.value += el.innerHTML;
    // query to get updated values for cipherOutput
    let shiftedVals = document.querySelectorAll("#source-display tr td span");
    cipherOutput.value += shiftedVals[idx].innerHTML;

    // keyword table highlight
    keywordField.highlightCell(true);
    keywordField.currentIdx += 1;
    keywordField.highlightCell();

    applyshift();
  });
});

// initial source text table
function initshift() {
  clearOutput();
  applyshift();
}

// update source text table everytime when there is a new source text is inputed
function applyshift() {
  let pointer = keywordField.currentIdx;
  let len = keywordField.currentKeyword.length;
  let shift;
  if(len === 0) {
    keywordField.currentIdx = 0;
    shift = 0;
  } else {
    let currentLetter = keywordField.currentKeyword[pointer % len];
    shift = letters.indexOf(currentLetter);
  }
  fillShiftedLetter(shift, true);
}

// build & fill values to source text table
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

// perform caesar cipher for a single letter
function caesarCipher(letter, shift) {
  let offset = (letter.charCodeAt(0) - "A".charCodeAt(0) + shift) % 26;
  let newLetter = String.fromCharCode(offset + "A".charCodeAt(0));

  return newLetter;
}

// clear output text & reset keyword highlight
function clearOutput() {
  sourceOutput.value = "";
  cipherOutput.value = "";

  keywordField.highlightCell(true);
  keywordField.currentIdx = 0;
  keywordField.highlightCell();
  applyshift();
}
