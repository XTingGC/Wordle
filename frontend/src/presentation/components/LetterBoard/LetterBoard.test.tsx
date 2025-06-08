import { render, screen } from '@testing-library/react'
import LetterBoard from './LetterBoard'
import { Word } from '../../../domain/entities/Word'

describe('LetterBoard', () => {
  it('renders empty rows if there are no attempts', () => {
    const { container } = render(<LetterBoard attempts={[]} currentWord="" />)
    const tiles = container.querySelectorAll('[class*="tile"]')
    expect(tiles).toHaveLength(30)
    tiles.forEach(tile => {
      expect(tile.textContent).toBe('')
    })
  })

  it('renders letters from attempts', () => {
    const word = new Word('HELLO')
    render(<LetterBoard attempts={[word]} currentWord="" />)
    expect(screen.getByText('H')).toBeDefined()
    expect(screen.getByText('E')).toBeDefined()
    expect(screen.getAllByText('L')).toHaveLength(2)
    expect(screen.getByText('O')).toBeDefined()
  })

  it('renders the current row while typing', () => {
    render(<LetterBoard attempts={[]} currentWord="TES" />)
    expect(screen.getByText('T')).toBeDefined()
    expect(screen.getByText('E')).toBeDefined()
    expect(screen.getByText('S')).toBeDefined()
  })
}) 