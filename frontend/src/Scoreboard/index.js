import { GAME_STATE_WON } from '../constants'
import { subtractDays } from '../util'

export default function Scoreboard ({ gameState, winStats }) {
  const streakDays = 1 + subtractDays(winStats.streakStart, winStats.streakEnd)
  const { totalWins } = winStats

  if (gameState === GAME_STATE_WON) {
    return (
      <div className='scoreboard'><p>Winner! Haiku made!</p>
        {streakDays > 1
          ? (<p>~ You are on a <strong>{streakDays}</strong> day streak ~</p>)
          : totalWins === 1
            ? (<p>~ Nice job on your <strong>first</strong> haiku ~</p>)
            : (<p>~ You have made <strong>{totalWins}</strong> haikus, total ~</p>)}
        <p>See you tomorrow</p>
      </div>
    )
  }

  return (
    <div>
      <p>See you tomorrow</p>
    </div>
  )
}
