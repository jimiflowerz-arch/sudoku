// 数独生成器
class SudokuGenerator {
  static generateSolution() {
    const grid = Array(9).fill(null).map(() => Array(9).fill(0));
    this.fillGrid(grid);
    return grid;
  }

  static fillGrid(grid) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          const nums = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (let num of nums) {
            if (this.isValid(grid, row, col, num)) {
              grid[row][col] = num;
              if (this.fillGrid(grid)) {
                return true;
              }
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  static isValid(grid, row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num || grid[i][col] === num) return false;
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (grid[i][j] === num) return false;
      }
    }
    return true;
  }

  static generatePuzzle(difficulty) {
    const solution = this.generateSolution();
    const puzzle = solution.map(row => [...row]);
    const cellsToRemove = difficulty === "easy" ? 40 : difficulty === "medium" ? 50 : 60;
    
    let removed = 0;
    while (removed < cellsToRemove) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (puzzle[row][col] !== 0) {
        puzzle[row][col] = 0;
        removed++;
      }
    }
    
    return { puzzle, solution };
  }

  static shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

// ===== 全局变量（只声明一次）=====
const CORRECT_PASSWORD = "zhanglei123";
let passwordVerified = false;
let currentDifficulty = "easy";
let timerInterval = null;
let startTime = null;
let puzzle = [];
let solution = [];

// ===== DOM 元素（只获取一次）=====
const passwordModal = document.getElementById("password-modal");
const passwordInput = document.getElementById("password-input");
const passwordBtn = document.getElementById("password-btn");
const passwordError = document.getElementById("password-error");
const difficultyModal = document.getElementById("difficulty-modal");
const difficultyDisplay = document.getElementById("difficulty-display");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");
const board = document.getElementById("sudoku-board");
const newButton = document.getElementById("new-button");
const checkButton = document.getElementById("check-button");
const restartButton = document.getElementById("restart-button");
const message = document.getElementById("message");
const timerDisplay = document.getElementById("timer");

// ===== 密码验证 =====
function checkPassword() {
  if (passwordInput.value === CORRECT_PASSWORD) {
    passwordVerified = true;
    passwordModal.classList.add("hidden");
    difficultyModal.classList.remove("hidden");
  } else {
    passwordError.textContent = "密码错误，请重试";
    passwordInput.value = "";
  }
}

function initPasswordCheck() {
  passwordBtn.addEventListener("click", checkPassword);
  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkPassword();
  });
}

// ===== 计时器 =====
function startTimer() {
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  stopTimer();
  timerDisplay.textContent = "00:00";
}

// ===== 难度选择 =====
difficultyButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const difficulty = e.target.dataset.difficulty;
    const difficultyNames = {
      easy: "简单",
      medium: "中等",
      hard: "困难"
    };
    
    currentDifficulty = difficulty;
    difficultyDisplay.textContent = difficultyNames[difficulty];
    difficultyModal.classList.add("hidden");
    startNewGameWithDifficulty();
  });
});

// ===== 棋盘操作 =====
function createBoard() {
  board.innerHTML = "";
  message.textContent = "";

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement("input");
      cell.classList.add("cell");
      cell.type = "text";
      cell.maxLength = 1;
      cell.dataset.row = row;
      cell.dataset.col = col;

      if (col === 2 || col === 5) {
        cell.classList.add("border-right");
      }

      if (row === 2 || row === 5) {
        cell.classList.add("border-bottom");
      }

      if (puzzle[row][col] !== 0) {
        cell.value = puzzle[row][col];
        cell.readOnly = true;
        cell.classList.add("fixed");
      } else {
        cell.addEventListener("input", handleInput);
      }

      board.appendChild(cell);
    }
  }
}

function handleInput(event) {
  const cell = event.target;
  if (!/^[1-9]$/.test(cell.value)) {
    cell.value = "";
  }
  cell.classList.remove("correct", "wrong");
  message.textContent = "";
}

function checkAnswer() {
  const cells = document.querySelectorAll(".cell");
  let allCorrect = true;

  cells.forEach((cell) => {
    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);
    const answer = String(solution[row][col]);

    cell.classList.remove("correct", "wrong");

    if (cell.value === answer) {
      cell.classList.add("correct");
    } else {
      cell.classList.add("wrong");
      allCorrect = false;
    }
  });

  if (allCorrect) {
    stopTimer();
    message.textContent = "恭喜，全部正确！";
  } else {
    message.textContent = "还有一些格子需要修改。";
  }
}

// ===== 游戏控制 =====
function startNewGameWithDifficulty() {
  const generated = SudokuGenerator.generatePuzzle(currentDifficulty);
  puzzle = generated.puzzle;
  solution = generated.solution;
  resetTimer();
  createBoard();
  startTimer();
}

function startNewGame() {
  difficultyModal.classList.remove("hidden");
}

// ===== 按钮事件监听 =====
newButton.addEventListener("click", startNewGame);
checkButton.addEventListener("click", checkAnswer);
restartButton.addEventListener("click", () => {
  resetTimer();
  createBoard();
  startTimer();
});

// ===== 初始化 =====
initPasswordCheck();
