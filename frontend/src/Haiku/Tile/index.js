import classnames from "classnames"

export default function Tile({ character }) {
    const className = classnames("tile", {
        "tile-blank": character === " ",
        "tile-censored": character === "*"
    })

    return <span className={className}>{character}</span>
}
