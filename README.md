# Tactile Tic-Tac-Toe

A polished, dependency-free tic-tac-toe game that runs in the browser. Play locally with a friend or challenge the unbeatable AI.

**Live demo:** [https://arena-tic-tac-toe-kimi.vercel.app](https://arena-tic-tac-toe-kimi.vercel.app)

---

## What it is

Tactile Tic-Tac-Toe is a single-page web app built for the Arena Sprint — Tic-Tac-Toe hackathon. It delivers a clean, responsive 3×3 game with two-player local play and an optional vs-computer mode powered by the minimax algorithm. The focus is on a bug-free, delightful experience with zero dependencies and instant load times.

---

## Features

- **Two-Player Local Play** — X and O alternate turns with clear visual feedback
- **Unbeatable AI** — "vs Computer" mode uses a full-depth minimax search; the AI never loses
- **Win / Draw Detection** — every possible board state is evaluated; winning lines are highlighted
- **Turn Indicator** — shows whose turn it is (and adapts to "Computer's turn" in AI mode)
- **Persistent Scoreboard** — X wins, O wins, and draws are saved to `localStorage`
- **Sound Effects** — synthesized click, win, and draw sounds via the Web Audio API (toggleable)
- **Responsive Design** — works on desktop and mobile without media-query gymnastics
- **Zero Dependencies** — no build step, no frameworks, no external assets

---

## How to run locally

1. Clone the repository:
   ```bash
   git clone https://github.com/layerx-labs/arena-tic-tac-toe-kimi.git
   cd arena-tic-tac-toe-kimi
   ```

2. Serve the files with any static file server:
   ```bash
   python3 -m http.server 8080
   ```

3. Open `http://localhost:8080` in your browser.

Because the game uses ES modules, opening `index.html` directly from the filesystem may trigger CORS restrictions in some browsers; a local server is recommended.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Markup | Semantic HTML5 |
| Styling | CSS Grid + Flexbox, CSS custom properties |
| Logic | Vanilla ES6+ JavaScript (modular) |
| Audio | Web Audio API (synthesized, no external files) |
| State persistence | `localStorage` |
| Deployment | Vercel |

---

## Architecture

The codebase is split into small, single-responsibility modules:

- `js/game.js` — core game loop, win/draw detection, turn management, and module orchestration
- `js/ai.js` — minimax algorithm with random tie-breaking for varied AI play
- `js/ui.js` — DOM manipulation, event listeners, and CSS class toggling
- `js/audio.js` — Web Audio API wrapper for click, win, and draw sounds
- `js/storage.js` — `localStorage` read/write for the scoreboard

`index.html` loads `js/game.js` as an ES module, which imports the other modules. No bundler is required.

---

## Decisions & trade-offs

- **Vanilla JS over a framework** — The scope is intentionally small. A framework would add build complexity and kilobytes for no gain.
- **ES modules over a single file** — Keeps code readable and maintainable while still requiring zero build tools. The trade-off is that a local server is needed during development to avoid CORS.
- **Synthesized audio over file assets** — Eliminates external dependencies and keeps the repo tiny. The sounds are simple but effective.
- **Minimax over heuristics** — Tic-tac-toe's state space is small enough that a full-depth search is trivial. This guarantees perfect play without the complexity of a neural network or heuristic evaluation.
- **Vercel over GitHub Pages** — Both are free and fast; Vercel was chosen for its instant deploy CLI and automatic HTTPS.

---

## License

MIT
