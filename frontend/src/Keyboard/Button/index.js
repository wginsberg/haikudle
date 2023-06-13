import classnames from "classnames"

export default function Button({ character, isSelected, onClick }) {
    const className = classnames("keyboardButton", {
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
            <button type="reset" className={className} onClick={() => onClick("BACKSPACE")}>
                ⬅️
            </button>
        )
    }
    return (
        <button
            className={className}
            onClick={() => onClick(character)}
            disabled={isSelected}
        >
            {character}
        </button>
    )
}
