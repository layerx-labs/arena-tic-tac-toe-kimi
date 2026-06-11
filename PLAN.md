# Arena Sprint: Tic-Tac-Toe — Build Plan

## Project Idea

**Tactile Tic-Tac-Toe** — a polished, single-page 3x3 tic-tac-toe game with two-player local play and an optional unbeatable AI opponent powered by the minimax algorithm. The game features a clean, modern UI with subtle animations, turn indicators, a persistent scoreboard (via localStorage), and optional sound effects using the Web Audio API. The focus is on a bug-free, delightful user experience with zero dependencies and a tiny footprint.

---

## Problem & Target User

**Problem:** Most browser tic-tac-toe examples are visually dated, lack AI, or feel like unfinished demos. There is a gap for a lightweight, beautiful, fully-functional game that works offline and loads instantly.

**Target user:** Casual players looking for a quick, distraction-free game in the browser — on desktop or mobile — without logins, ads, or bloat.

---

## Core Features

1. **3x3 Game Board** — clickable grid, responsive layout
2. **Two-Player Local Play** — X and O alternate turns with clear visual feedback
3. **Turn Indicator** — shows whose turn it is
4. **Win / Draw Detection** — highlights winning line, shows draw state
5. **New Game / Reset** — resets board, keeps score
6. **Score Tracking** — X wins, O wins, draws (persisted in localStorage)
7. **Unbeatable AI (Bonus)** — "Play vs Computer" mode using minimax algorithm
8. **Sound Effects** — click, win, draw sounds via Web Audio API (toggleable)
9. **Responsive Design** — works on mobile and desktop

---

## Tech Stack

| Layer | Choice | Justification |
|-------|--------|---------------|
| Frontend | Vanilla HTML5, CSS3, ES6+ JavaScript | Zero build step, zero dependencies, instant load, easiest to keep code clean and readable |
| Styling | CSS Grid + Flexbox, CSS custom properties | Native, responsive, modern, no framework overhead |
| Audio | Web Audio API | Native, no external assets, toggleable |
| State | In-memory JS + localStorage | No backend required; localStorage for score persistence |
| Deployment | GitHub Pages | Free, fast, tied to repo, zero-config for static sites |
| Version Control | Git (incremental commits) | Required for "Craft" rubric; each feature gets its own commit |

---

## Architecture

```
arena-tic-tac-toe-kimi/
├── index.html          # Single entry point, semantic markup
├── css/
│   └── styles.css      # Layout, animations, responsive breakpoints
├── js/
│   ├── game.js         # Core game logic (board state, win/draw detection, turns)
│   ├── ai.js           # Minimax algorithm for vs-computer mode
│   ├── ui.js           # DOM manipulation, event listeners, animations
│   ├── audio.js        # Web Audio API wrapper for sound effects
│   └── storage.js      # localStorage score persistence
├── assets/
│   └── (none — all generated in code)  # Keeps repo tiny
└── README.md           # Full writeup
```

**Data Flow:**
1. User clicks a cell → `ui.js` captures event
2. `game.js` validates move, updates board state, checks win/draw
3. If win/draw → `ui.js` highlights, `audio.js` plays sound, `storage.js` updates scores
4. If vs-computer mode and O's turn → `ai.js` calculates best move via minimax
5. `ui.js` renders updated board

---

## Rubric Mapping

### It works (40%)
- All core features implemented and manually tested
- Win/draw detection covers every possible board state
- AI never loses (minimax is proven correct)
- Responsive on mobile and desktop
- Zero console errors

### Craft (30%)
- Modular JS files with single responsibilities
- Semantic HTML, BEM-style CSS class naming
- Each feature in its own git commit with clear messages
- No unused code, no commented-out experiments in final version
- ESLint-friendly style (even without linter)

### Shipped (20%)
- Repo pushed to `layerx-labs/arena-tic-tac-toe-kimi`
- GitHub Pages enabled on `main` branch → public URL
- TAIKAI project created with repo in Code field and live URL in Demo field

### Writeup (10%)
- README includes: what it is, how to run locally, tech used, decisions/trade-offs
- TAIKAI project description is concise but complete
- Inline code comments explain the minimax algorithm for curious readers

---

## Build Milestones

| # | Milestone | Deliverable |
|---|-----------|-------------|
| 1 | Scaffold | `index.html`, `styles.css`, `game.js` skeleton; repo initialised; first commit |
| 2 | Two-Player Logic | Full 2-player game: turns, win/draw detection, reset button |
| 3 | UI Polish | Animations, turn indicator, score display, responsive layout |
| 4 | AI Opponent | Minimax implementation, mode toggle (2P vs AI) |
| 5 | Audio & Storage | Sound effects, localStorage score persistence |
| 6 | README & QA | Full README, manual testing on mobile + desktop, final commits |
| 7 | Deploy & Submit | GitHub Pages live, TAIKAI project published with correct links |

---

## Definition of Done

- [ ] Game loads and plays correctly at a public GitHub Pages URL
- [ ] Two-player mode: X and O alternate, wins/draws detected correctly
- [ ] AI mode: computer plays optimally (never loses)
- [ ] UI is responsive and visually polished on mobile and desktop
- [ ] Scores persist across page refreshes
- [ ] Repo has clean, modular code and incremental git history
- [ ] README explains the project, local setup, tech choices, and trade-offs
- [ ] TAIKAI project is published with GitHub repo in Code field and live URL in Demo field
