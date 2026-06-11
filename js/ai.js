/**
 * AI module — unbeatable tic-tac-toe opponent using the minimax algorithm.
 *
 * The game tree for tic-tac-toe is small enough (max 9! = 362880 nodes) that
 * a full-depth minimax search is trivial in the browser. The AI evaluates:
 *   +10  if the maximizing player (AI) wins
 *   -10  if the minimizing player (human) wins
 *     0  for a draw
 *
 * The AI always picks the move with the highest score, guaranteeing it never loses.
 */

const WIN_SCORE = 10;
const LOSE_SCORE = -10;
const DRAW_SCORE = 0;

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],            // diagonals
];

function checkWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every(cell => cell !== null)) return 'draw';
  return null;
}

function evaluate(board, depth) {
  const winner = checkWinner(board);
  if (winner === 'O') return WIN_SCORE - depth;   // AI wins — prefer faster wins
  if (winner === 'X') return LOSE_SCORE + depth;  // human wins — prefer slower losses
  if (winner === 'draw') return DRAW_SCORE;
  return null;
}

function minimax(board, depth, isMaximizing) {
  const score = evaluate(board, depth);
  if (score !== null) return score;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        best = Math.max(best, minimax(board, depth + 1, false));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        best = Math.min(best, minimax(board, depth + 1, true));
        board[i] = null;
      }
    }
    return best;
  }
}

/**
 * Returns the optimal index (0-8) for the AI ('O') to play.
 * If multiple moves tie, one is chosen at random to keep play varied.
 */
export function getBestMove(board) {
  const candidates = [];
  let bestScore = -Infinity;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = 'O';
      const score = minimax(board, 0, false);
      board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        candidates.length = 0;
        candidates.push(i);
      } else if (score === bestScore) {
        candidates.push(i);
      }
    }
  }

  return candidates[Math.floor(Math.random() * candidates.length)];
}
