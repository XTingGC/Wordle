export interface Letter {
  char: string;
  status: 'correct' | 'present' | 'absent' | 'empty';
}

export class Word {
  private letters: Letter[];

  constructor(word: string) {
    this.letters = word.split('').map(char => ({
      char,
      status: 'empty'
    }));
  }

  getLetters(): Letter[] {
    return this.letters;
  }

  setLetterStatus(index: number, status: Letter['status']): void {
    if (index >= 0 && index < this.letters.length) {
      this.letters[index].status = status;
    }
  }

  toString(): string {
    return this.letters.map(letter => letter.char).join('');
  }
} 