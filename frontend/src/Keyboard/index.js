import classnames from "classnames"
import Button from "./Button"
import { useEffect } from "react"

const LETTER_ROWS = [
    "qwertyuiop".split(""),
    "asdfghjkl".split(""),
    ["ENTER", ..."zxcvbnm".split(""), "BACKSPACE"]
]

export default function Keyboard({ selectedCharacters = new Set(), addCharacter, removeCharacter }) {
    // Handle events from device keyboard (desktop)
    useEffect(() => {
        const listener = (event) => {
            const { key } = event
            if (key === "Backspace") {
                removeCharacter()
            } else if (key.toLowerCase().match(/^[a-z]$/)) {
                if (!selectedCharacters.has(key)) {
                    addCharacter(key)
                }
            }
        }
        document.addEventListener('keydown', listener)
        const cleanup = () => document.removeEventListener('keydown', listener)
        return cleanup
    }, [selectedCharacters, removeCharacter, addCharacter])

    // Handle events from keyboard UI
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
