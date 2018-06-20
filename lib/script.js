// Add your code here
import KeywordArea from './keyword';

let keywordField = new KeywordArea();

let letters = Array(26).fill(1).map((el, idx) => {
  return String.fromCharCode(96 + el + idx).toUpperCase();
});

let lettersTable = document.getElementById("source-display");
let sourceInput = document.getElementById("source");

buildLettersTable();
// need to pass in shift from keyword
fillLettersTable(18);

let sourceButtons = document.querySelectorAll("#source-display td button");
let shiftedVals = document.querySelectorAll("#source-display td span");
sourceButtons.forEach((el, idx) => {
  el.addEventListener("click", () => {
    // get orginal letters from cell1
    // console.log(el.innerHTML);
    // get shifted letter from cell2
    console.log(`${shiftedVals[idx].innerHTML}`);
  });
});

function buildLettersTable() {
  let rowNum = 2;
  for(let i = 0; i < rowNum; i++) {
    lettersTable.insertRow(i);
  }
}

function fillLettersTable(shift) {
  for(let j = 0; j < letters.length; j++) {
    let sourceLetter = lettersTable.rows[0];
    let shiftLetter = lettersTable.rows[1];
    let cell1 = sourceLetter.insertCell(j);
    cell1.innerHTML = `<button>${letters[j]}</button>`;
    let cell2 = shiftLetter.insertCell(j);
    let newChar = caesarCipher(letters[j], shift);
    cell2.innerHTML = `<span>${newChar}</span>`;
  }
}

function caesarCipher(letter, shift) {
  let offset = (letter.charCodeAt(0) - "A".charCodeAt(0) + shift) % 26;
  let newLetter = String.fromCharCode(offset + "A".charCodeAt(0));

  return newLetter;
}
