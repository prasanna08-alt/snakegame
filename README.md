# Snake Game (React + SVG)

Auto-playing Snake game. The snake finds the red dot by itself (BFS path finding),
eats it, the dot respawns at a random empty spot, and the game stops at score 5.

## Run
    npm install
    npm run dev
Open the URL shown in the terminal (usually http://localhost:5173).

## Structure
- src/utils/gameLogic.js   - game logic functions (random food, BFS path, step)
- src/hooks/useSnakeGame.js - game loop (setInterval) + restart
- src/components/GameBoard.jsx - SVG snake, food, gradients, glow filter
- src/components/Header.jsx - SVG logo + title
- src/App.css - styling
