const resetButton = document.querySelector('.reset');
const container = document.querySelector('.container');
const grid = document.querySelectorAll('.box');
const board = gameBoard();

resetButton.addEventListener('click', e => {
  board.resetBoard();
  e.stopPropagation();
  board.canPlay = true;
});


grid.forEach((box) => box.addEventListener('click', e => {
  if (board.canPlay) {
      let index = box.getAttribute('data-index');
    let row = index%3;
    let col = Math.floor(index/3);
    let turn = board.getTurn();
    if (board.getBoard()[row][col] === 0) {
      board.setBoard(row,col,turn);
      if (turn === 1){
        box.classList.add('mark-x');
        if (board.checkWin(row,col,turn)){
          board.canPlay = false;
          board.displayWin();
        }
        board.setTurn(turn);
      } else{
        if (board.checkWin(row,col,turn)){
          board.canPlay = false;
          board.displayWin();
        }
        box.classList.add('mark-o');
        board.setTurn(turn);
      }
    }
  }
  e.stopPropagation();
}));


function gameBoard() {
  // turn 1 -> x       turn 2 -> o\
  let canPlay = true;
  let turn = 1;
  let gameBoard = [
  [0,0,0],
  [0,0,0],
  [0,0,0]];

  
  const getTurn = () => {
    return turn;
  }
  const setTurn = (t) => {
    turn = t === 2 ? 1 : 2;
  }
  const getBoard = () => {
    return gameBoard;
  }

  const setBoard = (y,x,turn) => {
    gameBoard[y][x] = turn;
  }


  const checkWin = (y,x,turn) => {
    let count = 1;
    let dumX = x;
    let dumY = y;
    // HORIZONTAL
    while(dumX-1 >= 0){
      dumX -= 1;
      if (gameBoard[y][dumX] !== turn){
        break;
      }
      count++;
    }
    dumX = x;
    while(dumX+1 <= 2){
      dumX += 1;
      if (gameBoard[y][dumX] !== turn){
        break;
      }
      count++;
    }
    if (count >= 3){
      return true;
    }
    count = 1;
    dumX = x;


    // VERTICAL
    while(dumY-1 >= 0){
      dumY -= 1;
      if (gameBoard[dumY][x] !== turn){
        break;
      }
      count++;
    }
    dumY = y;
    while(dumY+1 <= 2){
      dumY += 1;
      if (gameBoard[dumY][y] !== turn){
        break;
      }
      count++;
    }

    if (count >= 3){
      return true;
    }
    count = 0;
    dumY = y;


    // DIAGONAL RIGHT
    let start = 0;
    while(start <= 2){
      if (gameBoard[start][start] !== turn){
        break;
      }
      count++;
      start += 1;
    }
    if (count >= 3){
      return true;
    }
    count = 0;
    start = 0;

    while(start <= 2){
      if (gameBoard[start][2-start] !== turn){
        break;
      }
      start += 1;
      count++;
    }

    if (count >= 3){
      return true;
    }

    return false;
  }

  const displayWin = () => {
    const winContainer = document.createElement('div');
    const title = document.createElement('h1');
    title.textContent = `Player ${(turn === 1 ? 'x' : 'o')} Has Won!`
    winContainer.setAttribute('class','win-container');
    winContainer.appendChild(title);
    winContainer.addEventListener('click', e =>{
      winContainer.parentNode.removeChild(winContainer);
    });
    document.querySelector("body").appendChild(winContainer);
  }

  const resetBoard = () => {
    canPlay = true;
    turn = 1;
    gameBoard = [
      [0,0,0],
      [0,0,0],
      [0,0,0]];
    grid.forEach((box) => {
      box.className = 'box';
    });
  }



  return {canPlay, getTurn, setTurn, getBoard, setBoard, checkWin, resetBoard, displayWin};
};
