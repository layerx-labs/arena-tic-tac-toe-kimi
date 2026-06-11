/**
 * UI module — handles DOM updates, event listeners, and animations.
 */

const boardEl = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const turnIndicator = document.getElementById('turn-indicator');
const scoreXEl = document.getElementById('score-x');
const scoreOEl = document.getElementById('score-o');
const scoreDrawEl = document.getElementById('score-draw');
const mode2pBtn = document.getElementById('mode-2p');
const modeAiBtn = document.getElementById('mode-ai');
const resetBtn = document.getElementById('reset-btn');
const soundBtn = document.getElementById('sound-toggle');

export function getCells() {
  return cells;
}

export function getBoardElement() {
  return boardEl;
}

export function onCellClick(handler) {
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      const index = Number(cell.dataset.index);
      handler(index);
    });
  });
}

export function onResetClick(handler) {
  resetBtn.addEventListener('click', handler);
}

export function onModeChange(handler) {
  mode2pBtn.addEventListener('click', () => handler('2p'));
  modeAiBtn.addEventListener('click', () => handler('ai'));
}

export function onSoundToggle(handler) {
  soundBtn.addEventListener('click', handler);
}

export function renderCell(index, player) {
  const cell = cells[index];
  cell.textContent = player;
  cell.classList.add(player.toLowerCase());
  cell.disabled = true;
}

export function highlightWin(line) {
  line.forEach(index => cells[index].classList.add('win'));
}

export function setTurnIndicator(text, playerClass) {
  turnIndicator.textContent = text;
  turnIndicator.className = 'turn-indicator';
  if (playerClass) {
    turnIndicator.classList.add(playerClass);
  }
}

export function updateScores({ x, o, draw }) {
  scoreXEl.textContent = String(x);
  scoreOEl.textContent = String(o);
  scoreDrawEl.textContent = String(draw);
}

export function setMode(mode) {
  if (mode === '2p') {
    mode2pBtn.classList.add('active');
    modeAiBtn.classList.remove('active');
  } else {
    modeAiBtn.classList.add('active');
    mode2pBtn.classList.remove('active');
  }
}

export function setSoundIcon(enabled) {
  soundBtn.textContent = enabled ? '🔊' : '🔇';
}

export function resetBoard() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o', 'win');
    cell.disabled = false;
  });
}

export function disableBoard() {
  cells.forEach(cell => {
    if (!cell.textContent) cell.disabled = true;
  });
}
