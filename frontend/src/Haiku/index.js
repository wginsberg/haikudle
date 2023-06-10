import Tile from "./Tile";
import { charactersTo2DStringArray } from "../util";

export default function Haiku({ characters }) {

    const wordArray2d = charactersTo2DStringArray(characters)

    return wordArray2d.map(line => {
        return (
            <>
                <div className="line">
                    {line.map(word => {
                        return (
                            <span className="word">
                                {word.split("").map(character => (<Tile character={character} />))}
                            </span>
                        )
                    })}
                </div>
            <br />
            </>
        )
    })
}
