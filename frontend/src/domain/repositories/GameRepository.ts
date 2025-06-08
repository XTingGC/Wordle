import { Word } from '../entities/Word';

export interface GameRepository {
  getTargetWord(): Promise<string>;
  validateWord(word: string): Promise<boolean>;
  saveGameState(gameState: {
    attempts: Word[];
    isGameOver: boolean;
    hasWon: boolean;
  }): Promise<void>;
  loadGameState(): Promise<{
    attempts: Word[];
    isGameOver: boolean;
    hasWon: boolean;
  }>;
  clearGameState(): Promise<void>;
} 