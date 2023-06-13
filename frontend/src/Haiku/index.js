import Tile from "./Tile";
import { charactersTo2DStringArray } from "../util";

export default function Haiku({ characters }) {

    const wordArray2d = charactersTo2DStringArray(characters)

    return (
        <div className="haiku">
            {wordArray2d.map((line, i) => {
                console.log(line, i)
                return (
                    <div key={i}>
                        <div className="line">
                            {line.map((word, j) => {
                                return (
                                    <span className="word" key={j}>
                                        {word
                                            .split("")
                                            .map((character, k) => (
                                                <Tile character={character} key={`${i}-${j}-${k}`} />
                                            ))}
                                    </span>
                                )
                            })}
                        </div>
                        <br />
                    </div>
                )
            })}
        </div>
    )
}
