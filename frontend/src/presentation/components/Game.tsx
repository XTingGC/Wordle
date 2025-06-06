import styles from './Game.module.css';


const keyboardRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['BACKSPACE', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER'],
];

export const Game = () => {
  // Simulación de tablero vacío (6 intentos, 5 letras)
  const emptyRows = Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => '')
  );

  return (
    <div className="bg-[#121213] w-[500px] flex">
      <div className={styles.board}>
        {emptyRows.map((row, i) => (
          <div className={styles.row} key={i}>
            {row.map((letter, j) => (
              <div className={styles.tile} key={j}>
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.keyboard}>
        {keyboardRows.map((row, i) => (
          <div className={styles.keyboardRow} key={i}>
            {row.map((key) =>
              key === 'BACKSPACE' ? (
                <button className={styles.key} key={key}>
                  <span className={styles.keyIcon}>⌫</span>
                </button>
              ) : key === 'ENTER' ? (
                <button className={styles.key} key={key}>
                  Enter
                </button>
              ) : (
                <button className={styles.key} key={key}>
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