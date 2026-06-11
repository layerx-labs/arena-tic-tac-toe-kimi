/**
 * Audio module — lightweight Web Audio API wrapper for sound effects.
 * All sounds are synthesized in-code (no external assets).
 */

let audioCtx = null;
let enabled = true;

function ensureContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

export function isEnabled() {
  return enabled;
}

export function toggle() {
  enabled = !enabled;
  return enabled;
}

export function playClick() {
  if (!enabled) return;
  ensureContext();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.15, audioCtx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.13);
}

export function playWin() {
  if (!enabled) return;
  ensureContext();
  const now = audioCtx.currentTime;
  [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + i * 0.08);
    gain.gain.setValueAtTime(0.0001, now + i * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.12, now + i * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.18);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now + i * 0.08);
    osc.stop(now + i * 0.08 + 0.2);
  });
}

export function playDraw() {
  if (!enabled) return;
  ensureContext();
  const now = audioCtx.currentTime;
  [440, 440].forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.2);
    gain.gain.setValueAtTime(0.0001, now + i * 0.2);
    gain.gain.exponentialRampToValueAtTime(0.1, now + i * 0.2 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.2 + 0.18);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now + i * 0.2);
    osc.stop(now + i * 0.2 + 0.2);
  });
}
