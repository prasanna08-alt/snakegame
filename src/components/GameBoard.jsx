import { BOARD_SIZE, CELL, GRID_SIZE } from "../utils/gameLogic";

// angle (deg) the head should face, based on the next segment
function headAngle(snake) {
  if (snake.length < 2) return 0;
  const dx = snake[0].x - snake[1].x;
  const dy = snake[0].y - snake[1].y;
  return Math.atan2(dy, dx) * (180 / Math.PI);
}

export default function GameBoard({ snake, food }) {
  const head = snake[0];
  const hx = head.x * CELL + CELL / 2;
  const hy = head.y * CELL + CELL / 2;

  return (
    <svg
      className="board-svg"
      viewBox={`0 0 ${BOARD_SIZE} ${BOARD_SIZE}`}
      width="100%"
    >
      <defs>
        {/* background */}
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1b211d" />
          <stop offset="100%" stopColor="#0d100e" />
        </linearGradient>

        {/* snake body */}
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8dffa6" />
          <stop offset="50%" stopColor="#1fc653" />
          <stop offset="100%" stopColor="#0a7a2c" />
        </linearGradient>

        {/* snake head */}
        <radialGradient id="headGrad" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#b6ffc7" />
          <stop offset="60%" stopColor="#2ee066" />
          <stop offset="100%" stopColor="#0b8a31" />
        </radialGradient>

        {/* red dot / apple */}
        <radialGradient id="foodGrad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ff9a9a" />
          <stop offset="45%" stopColor="#e11d1d" />
          <stop offset="100%" stopColor="#7a0505" />
        </radialGradient>

        {/* glow */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* faint grid */}
        <pattern id="grid" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
          <path
            d={`M ${CELL} 0 L 0 0 0 ${CELL}`}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>

      <rect width={BOARD_SIZE} height={BOARD_SIZE} fill="url(#bgGrad)" />
      <rect width={BOARD_SIZE} height={BOARD_SIZE} fill="url(#grid)" />

      {/* red dot */}
      {food && (
        <g filter="url(#glow)">
          <circle
            cx={food.x * CELL + CELL / 2}
            cy={food.y * CELL + CELL / 2}
            r={CELL / 2 - 2}
            fill="url(#foodGrad)"
          >
            <animate
              attributeName="r"
              values={`${CELL / 2 - 2};${CELL / 2 - 1};${CELL / 2 - 2}`}
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      )}

      {/* snake body */}
      <g filter="url(#glow)">
        {snake
          .slice(1)
          .reverse()
          .map((seg, i) => (
            <rect
              key={i}
              x={seg.x * CELL + 1}
              y={seg.y * CELL + 1}
              width={CELL - 2}
              height={CELL - 2}
              rx="4"
              fill="url(#bodyGrad)"
              stroke="#0a5f24"
              strokeWidth="0.6"
            />
          ))}

        {/* snake head with eyes + tongue */}
        <g transform={`translate(${hx} ${hy}) rotate(${headAngle(snake)})`}>
          <path
            d={`M ${CELL / 2 - 1} 0 L ${CELL / 2 + 4} -1.5 M ${CELL / 2 + 4} -1.5 L ${CELL / 2 + 6} -3 M ${CELL / 2 + 4} -1.5 L ${CELL / 2 + 6} 0`}
            stroke="#ff4d4d"
            strokeWidth="0.9"
            fill="none"
            strokeLinecap="round"
          />
          <rect
            x={-CELL / 2 + 0.5}
            y={-CELL / 2 + 0.5}
            width={CELL - 1}
            height={CELL - 1}
            rx="5"
            fill="url(#headGrad)"
            stroke="#0a5f24"
            strokeWidth="0.7"
          />
          <circle cx="2.5" cy="-3" r="1.8" fill="#fff" />
          <circle cx="2.5" cy="3" r="1.8" fill="#fff" />
          <circle cx="3" cy="-3" r="0.9" fill="#000" />
          <circle cx="3" cy="3" r="0.9" fill="#000" />
        </g>
      </g>
    </svg>
  );
}
