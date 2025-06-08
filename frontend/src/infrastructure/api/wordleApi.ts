import { API_URL } from "../endpoints";

export interface GameResponse {
  gameId: string;
  status: number;
  attemptsLeft: number;
  wordToGuess: string;
  guesses: Array<{
    guessWord: string;
    result: string;
  }>;
}

export interface GuessResponse {
  result: string;
  attemptsLeft: number;
  isGameWon: boolean;
}

class WordleApi {
  private gameId: string | null = null;

  async startGame(difficulty?: 'easy' | 'medium' | 'hard'): Promise<string> {
    const response = await fetch(`${API_URL}/game`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: difficulty ? JSON.stringify({ difficulty }) : undefined,
    });

    if (!response.ok) {
      throw new Error('Failed to start game');
    }

    const data = await response.json();
    this.gameId = data.gameId;
    return data.gameId;
  }

  async makeGuess(word: string): Promise<GuessResponse> {
    if (!this.gameId) {
      throw new Error('Game not started');
    }

    const response = await fetch(
      `${API_URL}/game/${this.gameId}/guess?guessWord=${word}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.msg || error.error || 'Failed to make guess');
    }

    return response.json();
  }

  async getGameDetails(): Promise<GameResponse> {
    if (!this.gameId) {
      throw new Error('Game not started');
    }

    const response = await fetch(`${API_URL}/game/${this.gameId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get game details');
    }

    return response.json();
  }
}

export const wordleApi = new WordleApi(); 