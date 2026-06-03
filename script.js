// 密码设置
const CORRECT_PASSWORD = "zhanglei123";
let passwordVerified = false;

// 密码验证
function initPasswordCheck() {
  const passwordModal = document.getElementById("password-modal");
  const passwordInput = document.getElementById("password-input");
  const passwordBtn = document.getElementById("password-btn");
  const passwordError = document.getElementById("password-error");

  passwordBtn.addEventListener("click", () => {
    if (passwordInput.value === CORRECT_PASSWORD) {
      passwordVerified = true;
      passwordModal.classList.add("hidden");
      showDifficultyModal();
    } else {
      passwordError.textContent = "密码错误，请重试";
      passwordInput.value = "";
    }
  });

  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      passwordBtn.click();
    }
  });
}

// 难度相关的题目数据
const puzzlesByDifficulty = {
  easy: [
    {
      puzzle: [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
      ],
      solution: [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
      ]
    }
  ],
  medium: [
    {
      puzzle: [
        [0, 0, 0, 2, 6, 0, 7, 0, 1],
        [6, 0, 0, 0, 7, 0, 0, 0, 0],
        [0, 9, 0, 0, 0, 4, 2, 0, 0],
        [0, 0, 7, 1, 0, 0, 0, 0, 0],
        [5, 0, 0, 7, 0, 0, 0, 0, 4],
        [0, 0, 0, 0, 0, 9, 3, 0, 0],
        [0, 0, 5, 3, 0, 0, 0, 7, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 3],
        [4, 0, 2, 0, 5, 8, 0, 0, 0]
      ],
      solution: [
        [8, 3, 4, 2, 6, 5, 7, 9, 1],
        [6, 1, 2, 9, 7, 3, 5, 8, 0],
        [7, 9, 0, 8, 0, 4, 2, 6, 0],
        [0, 0, 7, 1, 0, 0, 0, 0, 0],
        [5, 0, 0, 7, 0, 0, 0, 0, 4],
        [0, 0, 0, 0, 0, 9, 3, 0, 0],
        [0, 0, 5, 3, 0, 0, 0, 7, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 3],
        [4, 0, 2, 0, 5, 8, 0, 0, 0]
      ]
    }
  ],
  hard: [
    {
      puzzle: [
        [3, 0, 0, 0, 1, 0, 0, 0, 2],
        [0, 0, 0, 0, 0, 8, 0, 4, 0],
        [0, 4, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 4, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 5, 7, 0, 0, 0, 0],
        [0, 0, 0, 4, 0, 0, 2, 0, 0],
        [0, 0, 2, 0, 0, 0, 0, 8, 0],
        [0, 9, 0, 3, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 8, 0, 0, 0, 3]
      ],
      solution: [
        [3, 8, 5, 9, 1, 6, 4, 7, 2],
        [7, 1, 9, 2, 5, 8, 6, 4, 0],
        [0, 4, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 4, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 5, 7, 0, 0, 0, 0],
        [0, 0, 0, 4, 0, 0, 2, 0, 0],
        [0, 0, 2, 0, 0, 0, 0, 8, 0],
        [0, 9, 0, 3, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 8, 0, 0, 0, 3]
      ]
    }
  ]
};

// 预置的数独题目集合（保留用于兼容）
const puzzles = [
  {
    puzzle: [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ],
    solution: [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ]
  },
  {
    puzzle: [
      [0, 0, 0, 2, 6, 0, 7, 0, 1],
      [6, 0, 0, 0, 7, 0, 0, 0, 0],
      [0, 9, 0, 0, 0, 4, 2, 0, 0],
      [0, 0, 7, 1, 0, 0, 0, 0, 0],
      [5, 0, 0, 7, 0, 0, 0, 0, 4],
      [0, 0, 0, 0, 0, 9, 3, 0, 0],
      [0, 0, 5, 3, 0, 0, 0, 7, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 3],
      [4, 0, 2, 0, 5, 8, 0, 0, 0]
    ],
    solution: [
      [8, 3, 4, 2, 6, 5, 7, 9, 1],
      [6, 1, 2, 9, 7, 3, 5, 8, 0],
      [7, 9, 0, 8, 0, 4, 2, 6, 0],
      [0, 0, 7, 1, 0, 0, 0, 0, 0],
      [5, 0, 0, 7, 0, 0, 0, 0, 4],
      [0, 0, 0, 0, 0, 9, 3, 0, 0],
      [0, 0, 5, 3, 0, 0, 0, 7, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 3],
      [4, 0, 2, 0, 5, 8, 0, 0, 0]
    ]
  },
  {
    puzzle: [
      [3, 0, 0, 0, 1, 0, 0, 0, 2],
      [0, 0, 0, 0, 0, 8, 0, 4, 0],
      [0, 4, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 4, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 5, 7, 0, 0, 0, 0],
      [0, 0, 0, 4, 0, 0, 2, 0, 0],
      [0, 0, 2, 0, 0, 0, 0, 8, 0],
      [0, 9, 0, 3, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 8, 0, 0, 0, 3]
    ],
    solution: [
      [3, 8, 5, 9, 1, 6, 4, 7, 2],
      [7, 1, 9, 2, 5, 8, 6, 4, 0],
      [0, 4, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 4, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 5, 7, 0, 0, 0, 0],
      [0, 0, 0, 4, 0, 0, 2, 0, 0],
      [0, 0, 2, 0, 0, 0, 0, 8, 0],
      [0, 9, 0, 3, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 8, 0, 0, 0, 3]
    ]
  }
];

let currentPuzzleIndex = 0;
let puzzle = puzzles[0].puzzle;
let solution = puzzles[0].solution;
let currentDifficulty = "easy";
let timerInterval = null;
let startTime = null;

const board = document.getElementById("sudoku-board");
const newButton = document.getElementById("new-button");
const checkButton = document.getElementById("check-button");
const restartButton = document.getElementById("restart-button");
const message = document.getElementById("message");
const timerDisplay = document.getElementById("timer");
const difficultyModal = document.getElementById("difficulty-modal");
const difficultyDisplay = document.getElementById("difficulty-display");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");

// 计时器功能
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

// 难度选择功能
function showDifficultyModal() {
  difficultyModal.classList.remove("hidden");
}

function hideDifficultyModal() {
  difficultyModal.classList.add("hidden");
}

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
    hideDifficultyModal();
    startNewGameWithDifficulty();
  });
});

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

  // 只允许输入 1 到 9，其他内容会被清空。
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

function startNewGameWithDifficulty() {
  const puzzlesForDifficulty = puzzlesByDifficulty[currentDifficulty];
  const randomIndex = Math.floor(Math.random() * puzzlesForDifficulty.length);
  puzzle = puzzlesForDifficulty[randomIndex].puzzle;
  solution = puzzlesForDifficulty[randomIndex].solution;
  resetTimer();
  createBoard();
  startTimer();
}

function startNewGame() {
  showDifficultyModal();
}

newButton.addEventListener("click", startNewGame);
checkButton.addEventListener("click", checkAnswer);
restartButton.addEventListener("click", () => {
  resetTimer();
  createBoard();
  startTimer();
});

// 初始化
initPasswordCheck();
