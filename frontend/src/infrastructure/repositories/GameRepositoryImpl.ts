import type { GameRepository } from '../../domain';
import { Word } from '../../domain';
import { normalizeWordResponse, normalizeValidateResponse } from '../normalization/normalizeGame';
import { WORD_ENDPOINT, VALIDATE_ENDPOINT } from '../endpoints';

export class GameRepositoryImpl implements GameRepository {
  async getTargetWord(): Promise<string> {
    const response = await fetch(WORD_ENDPOINT);
    if (!response.ok) {
      throw new Error('Failed to fetch target word');
    }
    const data = await response.json();
    const parsed = normalizeWordResponse(data);
    return parsed.word;
  }

  async validateWord(word: string): Promise<boolean> {
    const response = await fetch(VALIDATE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word }),
    });
    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    const parsed = normalizeValidateResponse(data);
    return parsed.isValid;
  }

  async saveGameState(gameState: {
    attempts: Word[];
    isGameOver: boolean;
    hasWon: boolean;
  }): Promise<void> {
    localStorage.setItem('wordle-game-state', JSON.stringify({
      attempts: gameState.attempts.map(word => word.toString()),
      isGameOver: gameState.isGameOver,
      hasWon: gameState.hasWon,
    }));
  }

  async loadGameState(): Promise<{
    attempts: Word[];
    isGameOver: boolean;
    hasWon: boolean;
  }> {
    const savedState = localStorage.getItem('wordle-game-state');
    if (!savedState) {
      return {
        attempts: [],
        isGameOver: false,
        hasWon: false,
      };
    }

    const parsedState = JSON.parse(savedState);
    return {
      attempts: parsedState.attempts.map((word: string) => new Word(word)),
      isGameOver: parsedState.isGameOver,
      hasWon: parsedState.hasWon,
    };
  }

  async clearGameState(): Promise<void> {
    localStorage.removeItem('wordle-game-state');
  }
} 