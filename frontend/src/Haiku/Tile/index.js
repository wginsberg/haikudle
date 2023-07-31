import classnames from 'classnames'
import { GUESSED } from '../../util'

export default function Tile ({ character, meta, wordIsIncorrect, wordIsComplete }) {
  const className = classnames('tile', {
    'tile-blank': character === ' ',
    'tile-censored': character === '*',
    'tile-input': meta === GUESSED,
    'tile-incorrect': wordIsIncorrect && meta === GUESSED,
    'tile-complete': wordIsComplete
  })

  const formattedCharacter = character === '*'
    ? ''
    : character

  return <span className={className}>{formattedCharacter}</span>
}
