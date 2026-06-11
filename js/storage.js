/**
 * Storage module — persists scores across page refreshes via localStorage.
 */

const STORAGE_KEY = 'tactile-tic-tac-toe-scores';

export function loadScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (
        typeof parsed.x === 'number' &&
        typeof parsed.o === 'number' &&
        typeof parsed.draw === 'number'
      ) {
        return parsed;
      }
    }
  } catch {
    // ignore corrupt storage
  }
  return { x: 0, o: 0, draw: 0 };
}

export function saveScores(scores) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch {
    // ignore quota errors
  }
}
