import { useEffect, useState } from 'react';
import { useGameContext } from '../context/GameContext';
import styles from './Game.module.css';

const keyboardRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['BACKSPACE', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER'],
];

export const Game = () => {
  const { startGame, makeGuess, attempts, isGameOver, hasWon, error, resetGame } = useGameContext();
  const [currentWord, setCurrentWord] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    startGame();
  }, [startGame]);

  const handleKeyPress = async (key: string) => {
    if (isGameOver) return;

    if (key === 'BACKSPACE') {
      setCurrentWord(prev => prev.slice(0, -1));
    } else if (key === 'ENTER') {
      if (currentWord.length !== 5) {
        setMessage('La palabra debe tener 5 letras');
        return;
      }
      const success = await makeGuess(currentWord);
      if (success) {
        setCurrentWord('');
        setMessage('');
      } else {
        setCurrentWord('');
        setMessage('La palabra no es válida');
      }
    } else if (currentWord.length < 5) {
      setCurrentWord(prev => prev + key);
    }
  };

  // Manejar teclas físicas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        handleKeyPress('BACKSPACE');
      } else if (e.key === 'Enter') {
        handleKeyPress('ENTER');
      } else if (/^[a-zA-ZñÑ]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentWord, isGameOver]);

  // Renderizar el tablero
  const renderBoard = () => {
    const rows = Array.from({ length: 6 }, (_, i) => {
      const attempt = attempts[i];
      const letters = attempt ? attempt.getLetters() : Array(5).fill({ char: '', status: 'empty' });
      
      return (
        <div className={styles.row} key={i}>
          {letters.map((letter, j) => (
            <div 
              className={`${styles.tile} ${styles[letter.status]}`} 
              key={j}
            >
              {letter.char}
            </div>
          ))}
        </div>
      );
    });

    // Añadir la fila actual si no está llena
    if (currentWord.length > 0 && attempts.length < 6) {
      const currentRow = (
        <div className={styles.row} key="current">
          {Array.from({ length: 5 }, (_, i) => (
            <div className={styles.tile} key={i}>
              {currentWord[i] || ''}
            </div>
          ))}
        </div>
      );
      rows[attempts.length] = currentRow;
    }

    return rows;
  };

  const handleRestart = async () => {
    await resetGame();
    setCurrentWord('');
    setMessage('');
  };

  return (
    <div className={styles.game}>
      {error && <div className={styles.error}>{error}</div>}
      {message && <div className={styles.message}>{message}</div>}
      {isGameOver && (
        <>
          <div className={styles.gameOver}>
            {hasWon ? '¡Felicidades! Has ganado 🎉' : '¡Game Over! La palabra era ESAVE 😢'}
          </div>
          <button className={styles.key} onClick={handleRestart} style={{ marginBottom: 16 }}>
            Reiniciar juego
          </button>
        </>
      )}
      <div className={styles.board}>
        {renderBoard()}
      </div>
      <div className={styles.keyboard}>
        {keyboardRows.map((row, i) => (
          <div className={styles.keyboardRow} key={i}>
            {row.map((key) =>
              key === 'BACKSPACE' ? (
                <button 
                  className={styles.key} 
                  key={key}
                  onClick={() => handleKeyPress('BACKSPACE')}
                  disabled={isGameOver}
                >
                  <span className={styles.keyIcon}>⌫</span>
                </button>
              ) : key === 'ENTER' ? (
                <button 
                  className={styles.key} 
                  key={key}
                  onClick={() => handleKeyPress('ENTER')}
                  disabled={isGameOver}
                >
                  Enter
                </button>
              ) : (
                <button 
                  className={styles.key} 
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  disabled={isGameOver}
                >
                  {key}
                </button>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 