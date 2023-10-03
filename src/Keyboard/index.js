import { useEffect } from 'react'

import Button from './Button'
import { useRepeatedCall, useTemporaryState } from '../hooks'

const LETTER_ROWS = [
  'qwertyuiop'.split(''),
  'asdfghjkl'.split(''),
  [...'zxcvbnm'.split(''), 'backspace']
]

export default function Keyboard ({ selectedCharacters = new Set(), addCharacter, removeCharacter }) {
  const [lastPress, setLastPress] = useTemporaryState('')

  const setRepeatedBackspace = useRepeatedCall(removeCharacter)

  // Handle events from device keyboard (desktop)
  useEffect(() => {
    const listener = (event) => {
      const key = event.key.toLowerCase()
      if (key === 'backspace') {
        removeCharacter()
      } else if (key.match(/^[a-z]$/)) {
        addCharacter(key)
      }

      setLastPress(key)
    }
    document.addEventListener('keydown', listener)
    const cleanup = () => document.removeEventListener('keydown', listener)
    return cleanup
  }, [removeCharacter, addCharacter, setLastPress])

  // Handle events from keyboard UI
  const onButtonClick = character => {
    if (character === 'backspace') {
      removeCharacter()
    } else {
      addCharacter(character)
    }

    setLastPress(character)
  }

  // Handle touch hold events
  const onTouchStart = character => {
    if (character === 'backspace') {
      setRepeatedBackspace(true)
    }
    setLastPress(character)
  }

  // TODO - handle addding characters
  const onTouchEnd = character => {
    if (character === 'backspace') {
      setRepeatedBackspace(false)
    }
    setLastPress(character)
  }

  return (
    <div className='keyboard'>
      {LETTER_ROWS.map((letters, i) =>
        letters.map(letter => {
          const isSelected = selectedCharacters.has(letter)
          return (
            <Button
              character={letter}
              isSelected={isSelected}
              onClick={onButtonClick}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              row={i + 1}
              isPressed={letter === lastPress}
              key={letter}
            />
          )
        })
      )}
    </div>
  )
}
