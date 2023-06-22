import { useEffect, useState } from 'react'
import Haiku from './Haiku'
import Keyboard from './Keyboard'

import { useDailyHaiku, useLocalStorage } from './hooks'
import { addHints, generateHintSequence, isSolved, FREE_HINT_CHARS, addInputToHaiku, isHintAllowed, incrementWinStats, canAddInput } from './util'
import { GAME_STATE_LOST, GAME_STATE_PLAY, GAME_STATE_WON } from './constants'
import Scoreboard from './Scoreboard'

function App () {
  const { haikuString, date, error } = useDailyHaiku()
  const [input, setInput] = useState('')
  const [hints, setHints] = useState(FREE_HINT_CHARS)
  const [gameState, setGameState] = useState(GAME_STATE_PLAY)
  const [winStats, setWinStats] = useLocalStorage('stats', { today: date, totalWins: 0 })

  const haikuWithHints = addHints(haikuString.split(''), hints)
  const disableHint = !isHintAllowed(haikuString, haikuWithHints)
  const disableGiveup = !haikuString

  // Check if the player won
  useEffect(() => {
    if (haikuWithHints.length === 0) return

    const censoredHaiku = addInputToHaiku(haikuWithHints, input).characters
    if (gameState === GAME_STATE_PLAY && isSolved(censoredHaiku, haikuString)) {
      setGameState(state => state === GAME_STATE_PLAY ? GAME_STATE_WON : state)

      setWinStats(incrementWinStats({ ...winStats, today: date }))
    }
  }, [haikuWithHints, haikuString, input, winStats, setWinStats, date, gameState])

  const addInput = character => {
    if (!canAddInput(haikuWithHints, input)) return
    setInput(input => input + character)
  }

  const removeInput = () => {
    setInput(input => input.slice(0, -1))
  }

  const addHint = () => {
    const hintSequence = generateHintSequence(haikuString, haikuWithHints, input)
    setHints(hints => new Set([...hints, hintSequence[0]]))
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

  if (error) {
    return (<p>Something went wrong :/</p>)
  }

  switch (gameState) {
    case GAME_STATE_PLAY:
      return (
        <div className='app'>
          <Haiku
            input={input}
            haiku={haikuString.split('')}
            haikuCensored={haikuWithHints}
          />
          <div className='helpActions'>
            <button onClick={addHint} disabled={disableHint}>Hint</button>
            <button onClick={confirmGiveup} disabled={disableGiveup}>Give up</button>
          </div>
          <Keyboard selectedCharacters={hints} addCharacter={addInput} removeCharacter={removeInput} />
        </div>
      )
    case GAME_STATE_WON:
    case GAME_STATE_LOST:
      return (
        <div className='app'>
          <Haiku
            input={input}
            haiku={haikuString.split('')}
            haikuCensored={haikuWithHints}
          />
          <Scoreboard gameState={gameState} winStats={winStats} />
        </div>
      )
    default:
      return (<p>Something went wrong :/</p>)
  }
}

export default App
