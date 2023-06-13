import classnames from "classnames"
import Button from "./Button"

const LETTER_ROWS = [
    "qwertyuiop".split(""),
    "asdfghjkl".split(""),
    ["ENTER", ..."zxcvbnm".split(""), "BACKSPACE"]
]

export default function Keyboard({ selectedCharacters = new Set(), addCharacter, removeCharacter }) {
    const onButtonClick = character => {
        if (character === "BACKSPACE") {
            removeCharacter()
        } else {
            addCharacter(character )
        }
    }

    return (
        <div className="keyboard">
            {LETTER_ROWS.map((letters, i) => {
                const className = classnames("keyboardRow", {
                    "keyboardRow-middle": i === 1
                })
                return (
                    <div className={className} key={i}>
                        {letters.map(letter => {
                            const isSelected = selectedCharacters.has(letter)
                            return (
                                <Button
                                    character={letter}
                                    isSelected={isSelected}
                                    onClick={onButtonClick}
                                    key={letter}
                                />
                            )
                        })}
                    </div>)
            })}
        </div>
    )
}
