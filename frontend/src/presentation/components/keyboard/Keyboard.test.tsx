import { render, screen, fireEvent } from '@testing-library/react'
import { Keyboard } from './Keyboard'

describe('Keyboard', () => {
  it('renders all keys', () => {
    render(<Keyboard handleKeyPress={() => {}} isGameOver={false} />)
    expect(screen.getByText('Q')).toBeDefined()
    expect(screen.getByText('A')).toBeDefined()
    expect(screen.getByText('Z')).toBeDefined()
    expect(screen.getByText('Enter')).toBeDefined()
    expect(screen.getByText((content, element) => {
      return element?.tagName === 'SPAN' && content === '⌫'
    })).toBeDefined()
  })

  it('calls handleKeyPress when a key is clicked', () => {
    const handleKeyPress = vi.fn()
    render(<Keyboard handleKeyPress={handleKeyPress} isGameOver={false} />)
    fireEvent.click(screen.getByText('Q'))
    expect(handleKeyPress).toHaveBeenCalledWith('Q')
  })

  it('disables keys when isGameOver is true', () => {
    render(<Keyboard handleKeyPress={() => {}} isGameOver={true} />)
    expect(screen.getByText('Q')).toBeDisabled()
    expect(screen.getByText('Enter')).toBeDisabled()
  })
}) 