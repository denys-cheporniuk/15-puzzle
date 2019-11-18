'use strict'

class Game {
  constructor(event) {
    this.blocksPosition = [];
  }

  randomNumber() {
    while (this.blocksPosition.length !== 16) {
      let rand = 1 + Math.floor(Math.random() * 16);
      if (!this.blocksPosition.includes(rand)) {
        this.blocksPosition.push(rand);
      }
    }
  };

  moveBlock(event) {
    this.target = event.target; 
    if (this.target.className !== 'game__cell') {
      return '';
    }
    let click = this.blocksPosition[15];
    let arrCopy = [...this.blocksPosition];
    [this.blocksPosition[this.target.id], this.blocksPosition[15]] =
      [this.blocksPosition[15], this.blocksPosition[this.target.id]];
    if (this.clickValid(click, arrCopy)) {
      this.swapBlock();
    }
    this.checkWin();
  };

  clickValid(click, arrCopy) {
    let availablePosition = [click - 1, click + 1,
    click - 4, click + 4];
    if (availablePosition.includes(this.blocksPosition[15])) {
      return true;
    } else {
      this.blocksPosition = arrCopy;
      return false;
    }
  };

  swapBlock() {
    let divs = game.children;
    for (let i in divs) {
      if (divs[i].className === 'game__cell') {
        divs[i].style.order = this.blocksPosition[i];
      }
    }
  };

  checkWin() {
    if (this.blocksPosition === 
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]) {
          alert("GREATE!")
          window.location.reload();
      }
  };

  createGameField() {
    for (let i = 0; i < 16; i++) {
      let div = document.createElement('div');
      div.className = 'game__cell';
      div.id = i;
      div.style.order = this.blocksPosition[i];
      game.appendChild(div);
    }
  };

}

let game = document.getElementById("game");

let play = new Game();
play.randomNumber();
play.createGameField();


game.addEventListener('click', (event) => {
  play.moveBlock(event);
});