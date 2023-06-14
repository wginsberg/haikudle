import classnames from "classnames"

export default function Button(props) {
    const { character, isSelected, onClick } = props
    const className = classnames(
        ["keyboardButton", props.className],
        { "keyboardButton-selected": isSelected})

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
        >
            {character}
        </button>
    )
}
