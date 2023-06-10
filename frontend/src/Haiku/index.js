import Tile from "./Tile";

export default function Haiku({ characters }) {
    const lines = []
    let j = 0;
    for (let i=0; i < characters.length; i++) {
        if (i === characters.length - 2) {
            lines.push(characters.slice(j, i))
        }
        if (characters[i] === " " && characters[i+1] === "/" && characters[i+2] === " ") {
            lines.push(characters.slice(j, i))
            j = i + 3
        }
    }

    return lines.map(line => {
        return (
            <>
                <p>{line.map(character => (<Tile character={character} />))}</p>
                <br />
            </>
        )
    })
}
