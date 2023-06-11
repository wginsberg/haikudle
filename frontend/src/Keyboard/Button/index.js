import classnames from "classnames"

export default function Button({ character, isSelected }) {
    const className = classnames("keyboardButton", {
        // "button-lg": character === "ENTER" || character === "BACKSPACE"
        "keyboardButton-selected": isSelected
    })

    if (character === "ENTER") {
        return (
            <button type="submit" className={className}>
                ENTER
            </button>
        )
    }

    if (character === "BACKSPACE") {
        return (
            <button type="reset" className={className}>
                ⬅️
            </button>
        )
    }
    return (
        <button className={className} disabled={isSelected}>
            {character}
        </button>
    )
}
