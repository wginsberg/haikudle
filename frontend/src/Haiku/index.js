import Tile from "./Tile";
import { charactersTo2DStringArray } from "../util";

export default function Haiku({ characters }) {

    const wordArray2d = charactersTo2DStringArray(characters)

    return (
        <div className="haiku">
            {wordArray2d.map((line, i) => {
                return (
                    <>
                        <div className="line" key={i}>
                            {line.map(word => {
                                return (
                                    <span className="word" key={word}>
                                        {word.split("").map((character, j) => (<Tile character={character} key={`${character}-${i}-${j}`} />))}
                                    </span>
                                )
                            })}
                        </div>
                        <br />
                    </>
                )
            })}
        </div>
    )
}
