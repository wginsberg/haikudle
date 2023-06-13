import Tile from "./Tile";
import { addInputToHaiku, charactersTo2DStringArray } from "../util";

export default function Haiku({ haiku, input }) {

    const { characters, meta } = addInputToHaiku(haiku, input)

    const wordArray2d = charactersTo2DStringArray(characters)
    const metaArray2d = charactersTo2DStringArray(meta)

    return (
        <div className="haiku">
            {wordArray2d.map((line, i) => (
                <div key={i}>
                    <div className="line">
                        {line.map((word, j) => {
                            return (
                                <span className="word" key={j}>
                                    {word
                                        .split("")
                                        .map((character, k) => (
                                            <Tile
                                                character={character}
                                                meta={metaArray2d[i][j][k]}
                                                key={`${i}-${j}-${k}`}
                                            />
                                        ))}
                                </span>
                            )
                        })}
                    </div>
                    <br />
                </div>
            ))}
        </div>
    )
}
