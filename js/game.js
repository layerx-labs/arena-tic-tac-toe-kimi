/**
 * Game module — core logic and orchestration for Tactile Tic-Tac-Toe.
 *
 * Responsibilities:
 *   - Maintain board state and current turn
 *   - Detect wins and draws
 *   - Coordinate UI, AI, audio, and storage modules
 *   - Handle mode switching and game reset
 */

import * as ui from './ui.js';
import * as audio from './audio.js';
import * as storage from './storage.js';
import { getBestMove } from './ai.js';

/* ===================== Constants ===================== */

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

/* ===================== State ===================== */

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;
let mode = '2p'; // '2p' | 'ai'
let scores = storage.loadScores();
let aiThinking = false;

/* ===================== Core Logic ===================== */

function checkWinner() {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  if (board.every(cell => cell !== null)) {
    return { winner: 'draw', line: null };
  }
  return null;
}

function switchTurn() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateTurnIndicator();
}

function updateTurnIndicator() {
  if (gameOver) return;
  const label = mode === 'ai' && currentPlayer === 'O'
    ? "Computer's turn"
    : `${currentPlayer}'s turn`;
  ui.setTurnIndicator(label, currentPlayer === 'X' ? 'x-turn' : 'o-turn');
}

function handleWin(result) {
  gameOver = true;
  if (result.winner === 'draw') {
    ui.setTurnIndicator("It's a draw!", 'win');
    scores.draw += 1;
    audio.playDraw();
  } else {
    ui.setTurnIndicator(`${result.winner} wins!`, 'win');
    ui.highlightWin(result.line);
    scores[result.winner.toLowerCase()] += 1;
    audio.playWin();
  }
  storage.saveScores(scores);
  ui.updateScores(scores);
  ui.disableBoard();
}

function makeMove(index) {
  if (gameOver || board[index] !== null || aiThinking) return false;

  board[index] = currentPlayer;
  ui.renderCell(index, currentPlayer);
  audio.playClick();

  const result = checkWinner();
  if (result) {
    handleWin(result);
    return true;
  }

  switchTurn();

  if (mode === 'ai' && currentPlayer === 'O' && !gameOver) {
    aiThinking = true;
    // Small delay makes the AI feel more natural and gives the browser time to render.
    setTimeout(() => {
      const move = getBestMove([...board]);
      aiThinking = false;
      makeMove(move);
    }, 350);
  }

  return true;
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  aiThinking = false;
  ui.resetBoard();
  updateTurnIndicator();
}

function setMode(newMode) {
  mode = newMode;
  ui.setMode(mode);
  resetGame();
}

function toggleSound() {
  const enabled = audio.toggle();
  ui.setSoundIcon(enabled);
}

/* ===================== Initialization ===================== */

function init() {
  ui.updateScores(scores);
  ui.setMode(mode);
  ui.setSoundIcon(audio.isEnabled());
  updateTurnIndicator();

  ui.onCellClick(index => makeMove(index));
  ui.onResetClick(() => resetGame());
  ui.onModeChange(newMode => setMode(newMode));
  ui.onSoundToggle(() => toggleSound());
}

init();
