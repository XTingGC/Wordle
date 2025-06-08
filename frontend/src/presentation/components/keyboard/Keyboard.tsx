import styles from './Keyboard.module.css';

const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['BACKSPACE', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER'],
  ];
  type Props = {
    handleKeyPress: (key: string) => void;
    isGameOver: boolean;
  }

  export const Keyboard = ({ handleKeyPress, isGameOver }: Props) => {
    return (
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
    )
  }

  export default Keyboard;