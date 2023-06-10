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
