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
  for(let i = 0; i < allKeywords.length; i++) {
    keywordDisplay.appendChild(displayKeywordDetail(allKeywords[i]));
  }
}

function displayKeywordDetail(letter) {
  // keywordInput.value.
  let eachDetail = document.createElement('ul');
  console.log(eachDetail);
  eachDetail.innerHTML = `<li>${letter}</li><li>${letterOffset.indexOf(letter)}</li>`;
  return eachDetail;
}

function clearDisplay() {
  keywordDisplay.innerHTML = "";
}
