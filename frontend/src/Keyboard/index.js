import classnames from "classnames"
import Button from "./Button"

const LETTER_ROWS = [
    "qwertyuiop".split(""),
    "asdfghjkl".split(""),
    ["ENTER", ..."zxcvbnm".split(""), "BACKSPACE"]
]

export default function Keyboard({ selectedCharacters = new Set() }) {
    return (
        <div className="keyboard">
            {LETTER_ROWS.map((letters, i) => {
                const className = classnames("keyboardRow", {
                    "keyboardRow-middle": i === 1
                })
                return (
                    <div className={className}>
                        {letters.map(letter => {
                            const isSelected = selectedCharacters.has(letter)
                            return (
                                <Button character={letter} isSelected={isSelected} />
                            )
                        })}
                    </div>)
            })}
        </div>
    )
}
