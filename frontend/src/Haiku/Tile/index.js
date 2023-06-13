import classnames from "classnames"
import { GUESSED } from "../../util"

export default function Tile({ character, meta }) {
    const className = classnames("tile", {
        "tile-blank": character === " ",
        "tile-censored": character === "*",
        "tile-input": meta === GUESSED
    })

    const formattedCharacter = character === "*"
        ? ""
        : character

    return <span className={className}>{formattedCharacter}</span>
}
