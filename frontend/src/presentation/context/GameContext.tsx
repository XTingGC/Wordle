import { createContext, useContext, type ReactNode } from "react"
import { useGame } from "../hooks/useGame"


type GameContextType = ReturnType<typeof useGame>

const GameContext = createContext<GameContextType | null>(null)

export const useGameContext = () => {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error("useGameContext must be used within a GameProvider")
  return ctx
}

type Props = {
  children: ReactNode;
}

export const GameProvider = ({ children }: Props) => {
  const contextValue = useGame()

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  )
}