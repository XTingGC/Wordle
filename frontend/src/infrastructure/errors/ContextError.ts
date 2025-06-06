export class ContextError extends Error {
  constructor(name = 'Context') {
    super(`${name} must be initialized`)
  }
}
