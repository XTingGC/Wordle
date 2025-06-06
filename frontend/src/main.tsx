import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Game } from "./presentation/components/Game";
import { GameProvider } from "./presentation/context/GameContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameProvider>
      <Game />
    </GameProvider>
  </StrictMode>
);