import { useCallback, useEffect, useState } from "react";
import { initialState, step, TICK_MS } from "../utils/gameLogic";

export default function useSnakeGame() {
  const [state, setState] = useState(initialState);

  // game loop - starts automatically when the page loads
  useEffect(() => {
    if (state.status !== "playing") return;
    const id = setInterval(() => setState((s) => step(s)), TICK_MS);
    return () => clearInterval(id);
  }, [state.status]);

  const restart = useCallback(() => setState(initialState()), []);

  return { ...state, restart };
}
