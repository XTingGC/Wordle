import { type Context, useContext as useReactContext } from 'react'
import { ContextError } from '../../infrastructure/errors/ContextError'


export const useContext = <C>(ctx: Context<C>, name?: string) => {
  const context = useReactContext<C>(ctx)
  if (!context) throw new ContextError(name || ctx.displayName)

  return context
}
