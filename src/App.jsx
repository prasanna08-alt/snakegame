import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import useSnakeGame from "./hooks/useSnakeGame";
import { WIN_SCORE } from "./utils/gameLogic";

export default function App() {
  const { snake, food, score, status, restart } = useSnakeGame();

  return (
    <div className="game-container">
      <div className="game-board">
        <Header />

        <div className="board-frame">
          <GameBoard snake={snake} food={food} />
          {status === "won" && (
            <div className="overlay">
              <h2>🎉 Completed!</h2>
              <p>
                Final Score: {score} / {WIN_SCORE}
              </p>
            </div>
          )}
        </div>

        <div className="controls-panel">
          <div className="score">Score: {score}</div>
          <button className="restart-btn" onClick={restart}>
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}
