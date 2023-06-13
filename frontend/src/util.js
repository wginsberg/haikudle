export const NON_HINT_CHARS = new Set(" /$_',.")
export const FREE_HINT_CHARS = new Set("rstlne")

export const GIVEN = "1"
export const GUESSED = "2"

export function addHints(haiku = [], letters = "") {
    const letterSet = new Set(letters)
    return haiku.map(haikuLetter => 
        letterSet.has(haikuLetter) || NON_HINT_CHARS.has(haikuLetter)
            ? haikuLetter
            : "*"
    )
}

export function charactersTo2DStringArray(characters=[]) {
    return characters
        .slice(0, -2)
        .join("")
        .split(" / ")
        .map(line => line.split(" "))
}

export function addInputToHaiku(haiku = [], input = "") {
    const newHaiku = [...haiku]
    const meta = [...haiku]

    let haikuIndex = 0
    let inputIndex = 0

    while (haikuIndex < haiku.length) {
        if (haiku[haikuIndex] === "*" && inputIndex < input.length) {
            newHaiku[haikuIndex] = input[inputIndex]
            meta[haikuIndex] = GUESSED
            inputIndex++
        } if (haiku[haikuIndex].match(/[a-z\\'\\.]/)) {
            meta[haikuIndex] = GIVEN
        }
        haikuIndex++
    }

    return {
        characters: newHaiku,
        meta
    }
}
