// ---------- Game constants ----------
export const GRID_SIZE = 20;   // 20 x 20 cells
export const CELL = 15;        // size of one cell in SVG units
export const BOARD_SIZE = GRID_SIZE * CELL;
export const WIN_SCORE = 5;    // game stops when score reaches this
export const TICK_MS = 110;    // speed of the snake

const DIRS = [
  { x: 1, y: 0 },   // right
  { x: -1, y: 0 },  // left
  { x: 0, y: 1 },   // down
  { x: 0, y: -1 },  // up
];

// ---------- Helpers ----------
export const same = (a, b) => a.x === b.x && a.y === b.y;

const inside = (p) =>
  p.x >= 0 && p.y >= 0 && p.x < GRID_SIZE && p.y < GRID_SIZE;

const key = (p) => `${p.x},${p.y}`;

// ---------- Initial snake (3 cells, middle of board, moving right) ----------
export function createSnake() {
  const y = Math.floor(GRID_SIZE / 2);
  return [
    { x: 4, y },
    { x: 3, y },
    { x: 2, y },
  ];
}

// ---------- Red dot appears at a random EMPTY cell ----------
export function randomFood(snake) {
  const taken = new Set(snake.map(key));
  const free = [];
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      if (!taken.has(`${x},${y}`)) free.push({ x, y });
    }
  }
  return free[Math.floor(Math.random() * free.length)];
}

// ---------- BFS: shortest path from snake head to the food ----------
function findPath(snake, food) {
  const head = snake[0];
  // the tail cell will move away, so it is not an obstacle
  const blocked = new Set(snake.slice(0, -1).map(key));
  const queue = [head];
  const cameFrom = new Map([[key(head), null]]);

  while (queue.length) {
    const cur = queue.shift();
    if (same(cur, food)) {
      // rebuild the path, return the very first step
      let step = cur;
      let prev = cameFrom.get(key(step));
      while (prev && !same(prev, head)) {
        step = prev;
        prev = cameFrom.get(key(step));
      }
      return step;
    }
    for (const d of DIRS) {
      const next = { x: cur.x + d.x, y: cur.y + d.y };
      const k = key(next);
      if (!inside(next) || blocked.has(k) || cameFrom.has(k)) continue;
      cameFrom.set(k, cur);
      queue.push(next);
    }
  }
  return null; // no path
}

// ---------- Fallback: any safe neighbour cell ----------
function anySafeMove(snake) {
  const head = snake[0];
  const blocked = new Set(snake.slice(0, -1).map(key));
  for (const d of DIRS) {
    const next = { x: head.x + d.x, y: head.y + d.y };
    if (inside(next) && !blocked.has(key(next))) return next;
  }
  return null;
}

// ---------- One game step (called every tick) ----------
export function step(state) {
  if (state.status !== "playing") return state;

  const nextHead = findPath(state.snake, state.food) || anySafeMove(state.snake);

  // trapped -> start a fresh snake but keep score
  if (!nextHead) {
    const snake = createSnake();
    return { ...state, snake, food: randomFood(snake) };
  }

  const ate = same(nextHead, state.food);
  const newSnake = [nextHead, ...state.snake];
  if (!ate) newSnake.pop(); // not eating -> tail moves forward

  if (!ate) return { ...state, snake: newSnake };

  const score = state.score + 1;
  if (score >= WIN_SCORE) {
    return { snake: newSnake, food: null, score, status: "won" };
  }
  return { snake: newSnake, food: randomFood(newSnake), score, status: "playing" };
}

export function initialState() {
  const snake = createSnake();
  return { snake, food: randomFood(snake), score: 0, status: "playing" };
}
