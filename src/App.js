import { useEffect, useState } from 'react'
import classnames from 'classnames'
import Haiku from './Haiku'
import Keyboard from './Keyboard'
import { useDailyHaiku, useLocalStorage, useHintButtonShake } from './hooks'
import { addHints, generateHintSequence, isSolved, FREE_HINT_CHARS, addInputToHaiku, isHintAllowed, incrementWinStats, canAddInput, getRandomHint } from './util'
import { GAME_STATE_LOST, GAME_STATE_PLAY, GAME_STATE_WON } from './constants'
import Scoreboard from './Scoreboard'

function App () {
  const { haiku: haikuString, date } = useDailyHaiku()

  const [input, setInput] = useState('')
  const [hints, setHints] = useState(FREE_HINT_CHARS)
  const [gameState, setGameState] = useState(GAME_STATE_PLAY)
  const [winStats, setWinStats] = useLocalStorage('stats', { today: date, totalWins: 0 })

  const haikuWithHints = addHints(haikuString.split(''), hints)
  const censoredHaiku = addInputToHaiku(haikuWithHints, input).characters
  const disableHint = !isHintAllowed(haikuString, haikuWithHints)
  const disableGiveup = !haikuString

  const shakeHintButton = useHintButtonShake(censoredHaiku)

  // Check if the player won
  useEffect(() => {
    if (haikuWithHints.length === 0) return

    if (gameState === GAME_STATE_PLAY && isSolved(censoredHaiku, haikuString)) {
      setGameState(state => state === GAME_STATE_PLAY ? GAME_STATE_WON : state)

      setWinStats(incrementWinStats({ ...winStats, today: date }))
    }
  }, [haikuWithHints, censoredHaiku, haikuString, input, winStats, setWinStats, date, gameState])

  const addInput = character => {
    if (!canAddInput(haikuWithHints, input)) return
    setInput(input => input + character)
  }

  const removeInput = () => {
    setInput(input => input.slice(0, -1))
  }

  const addHint = () => {
    const hintSequence = generateHintSequence(haikuString.split(''), haikuWithHints, input)
    const newHint = getRandomHint(hintSequence)
    console.log({hintSequence,newHint})
    setHints(hints => new Set([...hints, newHint]))
    setInput('')
  }

  const giveup = () => {
    setHints(new Set('abcdefghijklmnopqrstuvwxyz'))
    setGameState(GAME_STATE_LOST)
    setWinStats({ ...winStats, today: date })
  }

  const confirmGiveup = () => {
    const message = disableHint
      ? 'Are you sure you want to give up?'
      : 'Are you sure you want to give up?\nYou still have hints available.'

    window.confirm(message) && giveup()
  }

  switch (gameState) {
    case GAME_STATE_PLAY:
      return (
        <div className='app'>
          <div>
            <h1>Spooky Haikudle</h1>
            <Haiku
              input={input}
              haiku={haikuString.split('')}
              haikuCensored={haikuWithHints}
            />
          </div>
          <div className='helpActions'>
            <button
              onClick={addHint}
              disabled={disableHint}
              className={classnames({ shake: shakeHintButton && !disableHint })}
            >
              Hint
            </button>
            <button onClick={confirmGiveup} disabled={disableGiveup}>Give up</button>
          </div>
          <Keyboard selectedCharacters={hints} addCharacter={addInput} removeCharacter={removeInput} />
        </div>
      )
    case GAME_STATE_WON:
    case GAME_STATE_LOST:
      return (
        <div className='app'>
          <div>
            <h1>Spooky Haikudle</h1>
            <Haiku
              input={input}
              haiku={haikuString.split('')}
              haikuCensored={haikuWithHints}
            />
          </div>
          <Scoreboard gameState={gameState} winStats={winStats} />
        </div>
      )
    default:
      return (<p>Something went wrong :/</p>)
  }
}

export default App
