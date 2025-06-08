import { Word } from '../../domain'
import type { GameRepository } from '../../domain'
import { wordleApi } from '../../infrastructure'

export class GameService {
  private readonly MAX_ATTEMPTS = 6
  private targetWord: string = ''
  private attempts: Word[] = []
  private isGameOver: boolean = false
  private hasWon: boolean = false
  private gameId: string | null = null

  constructor(public gameRepository: GameRepository) {}

  async initializeGame(difficulty?: 'easy' | 'medium' | 'hard'): Promise<void> {
    try {
      this.gameId = await wordleApi.startGame(difficulty)
      const gameDetails = await wordleApi.getGameDetails()
      this.targetWord = gameDetails.wordToGuess
      const savedState = await this.gameRepository.loadGameState()
      if (savedState) {
        this.attempts = savedState.attempts
        this.isGameOver = savedState.isGameOver
        this.hasWon = savedState.hasWon
      }
    } catch (error) {
      console.error('Failed to initialize game:', error)
      throw new Error('Failed to initialize game')
    }
  }

  async makeGuess(word: string): Promise<boolean> {
    if (this.isGameOver || this.attempts.length >= this.MAX_ATTEMPTS) {
      return false
    }
    try {
      const response = await wordleApi.makeGuess(word)
      const guess = new Word(word)
      const resultParts = response.result.split(', ')
      let currentIndex = 0
      for (const part of resultParts) {
        const count = parseInt(part.split(' ')[0])
        if (part.includes('posición y letra correcta')) {
          for (let i = 0; i < count; i++) {
            guess.setLetterStatus(currentIndex + i, 'correct')
          }
        } else if (part.includes('posición incorrecta y letra correcta')) {
          for (let i = 0; i < count; i++) {
            guess.setLetterStatus(currentIndex + i, 'present')
          }
        } else if (part.includes('letra no existe en la palabra')) {
          for (let i = 0; i < count; i++) {
            guess.setLetterStatus(currentIndex + i, 'absent')
          }
        }
        currentIndex += count
      }
      this.attempts.push(guess)
      this.hasWon = response.isGameWon
      this.isGameOver = this.hasWon || response.attemptsLeft === 0
      await this.gameRepository.saveGameState({
        attempts: this.attempts,
        isGameOver: this.isGameOver,
        hasWon: this.hasWon
      })
      return true
    } catch (error) {
      console.error('Failed to make guess:', error)
      return false
    }
  }

  getGameState() {
    return {
      attempts: this.attempts,
      isGameOver: this.isGameOver,
      hasWon: this.hasWon,
      maxAttempts: this.MAX_ATTEMPTS,
      gameId: this.gameId
    }
  }
} 