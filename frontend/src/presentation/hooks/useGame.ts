import { useState, useCallback } from 'react';
import { GameService } from '../../application/services/GameService';
import { GameRepositoryImpl } from '../../infrastructure/repositories/GameRepositoryImpl';

export const useGame = () => {
  const [gameService, setGameService] = useState(() => new GameService(new GameRepositoryImpl()));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startGame = useCallback(async (difficulty?: 'easy' | 'medium' | 'hard') => {
    try {
      setIsLoading(true);
      setError(null);
      await gameService.initializeGame(difficulty);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start game');
    } finally {
      setIsLoading(false);
    }
  }, [gameService]);

  const makeGuess = useCallback(async (word: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const success = await gameService.makeGuess(word);
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to make guess');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [gameService]);

  const resetGame = useCallback(async () => {
    if (gameService.gameRepository.clearGameState) {
      await gameService.gameRepository.clearGameState();
    }
    const newService = new GameService(new GameRepositoryImpl());
    setGameService(newService);
    setError(null);
    setIsLoading(false);
    await newService.initializeGame();
  }, [gameService]);

  const gameState = gameService.getGameState();

  return {
    ...gameState,
    isLoading,
    error,
    startGame,
    makeGuess,
    resetGame,
  };
};
