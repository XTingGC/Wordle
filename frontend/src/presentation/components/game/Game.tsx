import { useEffect, useState } from "react";
import { useGameContext } from "../../context/GameContext";
import styles from "./Game.module.css";
import { Keyboard } from "../keyboard/Keyboard";
import LetterBoard from "../LetterBoard/LetterBoard";

export const Game = () => {
  const {
    startGame,
    makeGuess,
    attempts,
    isGameOver,
    hasWon,
    error,
    resetGame,
  } = useGameContext();
  const [currentWord, setCurrentWord] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    startGame();
  }, [startGame]);

  const handleKeyPress = async (key: string) => {
    if (isGameOver) return;

    if (key === "BACKSPACE") {
      setCurrentWord((prev) => prev.slice(0, -1));
    } else if (key === "ENTER") {
      if (currentWord.length !== 5) {
        setMessage("La palabra debe tener 5 letras");
        return;
      }
      const success = await makeGuess(currentWord);
      if (success) {
        setCurrentWord("");
        setMessage("");
      } else {
        setCurrentWord("");
        setMessage("La palabra no es válida");
      }
    } else if (currentWord.length < 5) {
      setCurrentWord((prev) => prev + key);
    }
  };

  // Manejar teclas físicas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        handleKeyPress("BACKSPACE");
      } else if (e.key === "Enter") {
        handleKeyPress("ENTER");
      } else if (/^[a-zA-ZñÑ]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentWord, isGameOver]);

  const handleRestart = async () => {
    await resetGame();
    setCurrentWord("");
    setMessage("");
  };

  return (
    <div className={styles.game}>
      {error && <div className={styles.error}>{error}</div>}
      {message && <div className={styles.message}>{message}</div>}
      {isGameOver && (
        <>
          <div className={styles.gameOver}>
            {hasWon
              ? "¡Felicidades! Has ganado 🎉"
              : "¡Game Over! La palabra era ESAVE 😢"}
          </div>
          <button
            className={styles.restartButton}
            onClick={handleRestart}
          >
            Reiniciar juego
          </button>
        </>
      )}
      <LetterBoard attempts={attempts} currentWord={currentWord} />
      <Keyboard handleKeyPress={handleKeyPress} isGameOver={isGameOver} />
    </div>
  );
};
