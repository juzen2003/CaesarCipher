// Add your code here
let letterOffset = Array(26).fill(1).map((el, idx) => {
  return String.fromCharCode(96 + el + idx).toUpperCase();
});

let keywordInput = document.getElementById("keyword");
let keywordDisplay = document.getElementById("keyword-display");

let button = document.getElementById("update");
button.addEventListener("click", displayKeyword);


function displayKeyword() {
  clearDisplay();
  let allKeywords = keywordInput.value.toUpperCase();
  buildKeywordTable();

  for(let i = 0; i < allKeywords.length; i++) {
    displayKeywordDetail(allKeywords[i]);
  }
}

function displayKeywordDetail(letter) {
  let keywordLetter = keywordDisplay.rows[0];
  let keywordOffset = keywordDisplay.rows[1];
  let cell1 = keywordLetter.insertCell(keywordLetter.cells.length);
  cell1.innerHTML = `${letter}`;
  let cell2 = keywordOffset.insertCell(keywordOffset.cells.length);
  cell2.innerHTML = `${letterOffset.indexOf(letter)}`;
}

function clearDisplay() {
  keywordDisplay.innerHTML = "";
}

function buildKeywordTable() {
  let rowNum = 2;
  for(let i = 0; i < rowNum; i++) {
    keywordDisplay.insertRow(i);
  }
}
