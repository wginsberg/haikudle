import Tile from "./Tile";
import { addInputToHaiku, charactersTo2DStringArray } from "../util";

export default function Haiku({ haiku, haikuCensored, input }) {

    const { characters, meta } = addInputToHaiku(haikuCensored, input)

    const wordArray2d = charactersTo2DStringArray(haiku)
    const censoredWordArray2d = charactersTo2DStringArray(characters)
    const metaArray2d = charactersTo2DStringArray(meta)

    console.log({ wordArray2d, censoredWordArray2d})

    return (
        <div className="haiku">
            {censoredWordArray2d.map((line, i) => (
                <div key={i}>
                    <div className="line">
                        {line.map((word, j) => {
                            const isComplete = word === wordArray2d[i][j]
                            return (
                                <span className="word" key={j}>
                                    {word
                                        .split("")
                                        .map((character, k) => (
                                            <Tile
                                                character={character}
                                                wordIsComplete={isComplete}
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
