import { useEffect } from 'react'
import classnames from 'classnames'

import Button from './Button'
import { useTemporaryState } from '../hooks'

const LETTER_ROWS = [
  'qwertyuiop'.split(''),
  'asdfghjkl'.split(''),
  [...'zxcvbnm'.split(''), 'BACKSPACE']
]

export default function Keyboard ({ selectedCharacters = new Set(), addCharacter, removeCharacter }) {
  const [lastPress, setLastPress] = useTemporaryState('')

  // Handle events from device keyboard (desktop)
  useEffect(() => {
    const listener = (event) => {
      const { key } = event
      if (key === 'Backspace') {
        removeCharacter()
      } else if (key.toLowerCase().match(/^[a-z]$/)) {
        if (!selectedCharacters.has(key)) {
          addCharacter(key)
        }
      }
      const keyFormatted = key === 'Backspace'
        ? 'BACKSPACE'
        : key

      setLastPress(keyFormatted)
    }
    document.addEventListener('keydown', listener)
    const cleanup = () => document.removeEventListener('keydown', listener)
    return cleanup
  }, [selectedCharacters, removeCharacter, addCharacter, setLastPress])

  // Handle events from keyboard UI
  const onButtonClick = character => {
    if (character === 'BACKSPACE') {
      removeCharacter()
    } else if (!selectedCharacters.has(character)) {
      addCharacter(character)
    }

    setLastPress(character)
  }

  return (
    <div className='keyboard'>
      {LETTER_ROWS.map((letters, i) =>
        letters.map(letter => {
          const isSelected = selectedCharacters.has(letter)
          const className = classnames(
            'keyboardRow',
            `keyboardRow-${i + 1}`,
            { 'keyboardButton-pressed': letter === lastPress }
          )
          return (
            <Button
              character={letter}
              isSelected={isSelected}
              onClick={onButtonClick}
              className={className}
              key={letter}
            />
          )
        })
      )}
    </div>
  )
}
