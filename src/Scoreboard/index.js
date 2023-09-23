import { GAME_STATE_WON } from '../constants'
import { subtractDays } from '../util'

export default function Scoreboard ({ gameState, winStats }) {
  const streakDays = 1 + subtractDays(winStats.streakStart, winStats.streakEnd)
  const { totalWins } = winStats

  if (gameState === GAME_STATE_WON) {
    return (
      <div className='scoreboard'>
        <span>Winner! Haiku made!</span>
        <br />
        {streakDays > 1
          ? (<span>~ You are on a <strong>{streakDays}</strong> day streak ~</span>)
          : totalWins === 1
            ? (<span>~ Nice job on your <strong>first</strong> haiku ~</span>)
            : (<span>~ You have made <strong>{totalWins}</strong> haikus, total ~</span>)}
        <br />
        <span>See you tomorrow</span>
      </div>
    )
  }

  return (
    <div className='scoreboard'>
      <span>See you tomorrow</span>
    </div>
  )
}
