class KeywordArea {
  constructor() {
    this.letterOffset = Array(26).fill(1).map((el, idx) => {
      return String.fromCharCode(96 + el + idx).toUpperCase();
    });
    this.keywordInput = document.getElementById("keyword");
    this.keywordDisplay = document.getElementById("keyword-display");
    this.button = document.getElementById("update");

    this.displayKeyword = this.displayKeyword.bind(this);
    this.init();
  }

  init() {
    this.button.addEventListener("click", this.displayKeyword);
    this.currentKeyword = "";
  }

  displayKeyword() {
    this.clearDisplay();
    let allKeywords = this.keywordInput.value.toUpperCase();
    this.currentKeyword = allKeywords;
    // console.log(this.currentKeyword);
    this.buildKeywordTable();

    for(let i = 0; i < allKeywords.length; i++) {
      this.displayKeywordDetail(allKeywords[i]);
    }
  }

  displayKeywordDetail(letter) {
    let keywordLetter = this.keywordDisplay.rows[0];
    let keywordOffset = this.keywordDisplay.rows[1];
    let cell1 = keywordLetter.insertCell(keywordLetter.cells.length);
    cell1.innerHTML = `${letter}`;
    let cell2 = keywordOffset.insertCell(keywordOffset.cells.length);
    cell2.innerHTML = `${this.letterOffset.indexOf(letter)}`;
  }

  clearDisplay() {
    this.keywordDisplay.innerHTML = "";
  }

  buildKeywordTable() {
    let rowNum = 2;
    for(let i = 0; i < rowNum; i++) {
      this.keywordDisplay.insertRow(i);
    }
  }

  keywordVals() {
    return this.keywordInput.value;
  }

}

export default KeywordArea;
