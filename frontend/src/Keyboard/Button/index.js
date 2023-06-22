import classnames from 'classnames'

export default function Button (props) {
  const { character, isSelected, onClick, onTouchStart, onTouchEnd } = props
  const className = classnames(
    ['keyboardButton', props.className],
    { 'keyboardButton-selected': isSelected })

  if (character === 'backspace') {
    return (
      <button
        type='reset'
        className={className}
        onClick={() => onClick('backspace')}
        onTouchStart={() => onTouchStart('backspace')}
        onTouchEnd={() => onTouchEnd('backspace')}
        onTouchCancel={() => onTouchEnd('backspace')}
      >
        ⬅️
      </button>
    )
  }
  return (
    <button
      className={className}
      onClick={() => onClick(character)}
    >
      {character}
    </button>
  )
}
