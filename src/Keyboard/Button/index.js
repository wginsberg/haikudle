import classnames from 'classnames'

export default function Button (props) {
  const { character, isSelected, onClick, onTouchStart, onTouchEnd, row, isPressed } = props

  const containerClassName = classnames(
    [
      'keyboardRow',
      `keyboardRow-${row}`,
      'keyboardButtonContainer'
    ])

  const contentClassName = classnames('keyboardButtonContent', {
    'keyboardButtonContent-selected': isSelected,
    'keyboardButtonContent-pressed': isPressed
  })

  if (character === 'backspace') {
    return (
      <button
        type='reset'
        className={classnames(containerClassName, 'keyboardButtonContainerBackspace')}
        onClick={() => onClick('backspace')}
        onTouchStart={() => onTouchStart('backspace')}
        onTouchEnd={() => onTouchEnd('backspace')}
        onTouchCancel={() => onTouchEnd('backspace')}
      >
        <div className={contentClassName}>⬅️</div>
      </button>
    )
  }
  return (
    <button
      className={containerClassName}
      onClick={() => onClick(character)}
    >
      <div className={contentClassName}>{character}</div>
    </button>
  )
}
