export const NON_HINT_CHARS = new Set(" /$_',.")
export const FREE_HINT_CHARS = new Set("rstlne")

export function censorHaiku(haiku = []) {
    return haiku.map(haikuLetter =>
        haikuLetter.match(/[^A-z]/)
            ? haikuLetter
            : "*"
        )
}

export function addHints(haiku = [], letters = "") {
    const letterSet = new Set(letters)
    return haiku.map(haikuLetter => 
        letterSet.has(haikuLetter) || NON_HINT_CHARS.has(haikuLetter)
            ? haikuLetter
            : "*"
    )
}
