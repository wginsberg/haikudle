export const NON_HINT_CHARS = new Set(" /$_',.")
export const FREE_HINT_CHARS = new Set("rstlne")

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
    let i = 0
    for (const character of input) {
        while (i < haiku.length) {
            if (haiku[i] === "*") {
                newHaiku[i] = character
                i++
                break
            } else {
                i++
            }
        }
    }
    return newHaiku
}
