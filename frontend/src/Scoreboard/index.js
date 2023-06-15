import { GAME_STATE_WON} from "../constants"

export default function Scoreboard({ gameState }) {
    const message = gameState === GAME_STATE_WON 
        ? "You won!"
        : "Come back tomorrow for another haiku!"

    return (
        <div>
            {message}
        </div>
    )
}
