import { Word } from '../../../domain/entities/Word';
import styles from './LetterBoard.module.css';

type Props = {
  attempts: Word[];
  currentWord: string;
}

export const LetterBoard = ({ attempts, currentWord }: Props) => {
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

  return (
    <div className={styles.board}>
      {renderBoard()}
    </div>
  );
};

export default LetterBoard;