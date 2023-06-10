const NON_HINT_CHARS = new Set(" /$_',.")
const FREE_HINT_CHARS = new Set("rstlne")

function censorHaiku(haiku = []) {
    return haiku.map(haikuLetter =>
        haikuLetter.match(/[^A-z]/)
            ? haikuLetter
            : "_"
        )
}

const rawHaiku = "delicate savage / you'll never hold the cinder / but still you will burn $"
const haikuArray = rawHaiku.split("")

const censored = censorHaiku(haikuArray)

console.log({ rawHaiku, censored })

function addHints(haiku = [], letters = "=") {
    const letterSet = new Set(letters)
    return haiku.map(haikuLetter => 
        letterSet.has(haikuLetter) || NON_HINT_CHARS.has(haikuLetter)
            ? haikuLetter
            : "*"
    )
}

const hints = [...FREE_HINT_CHARS, "d","v"]
const withHints = addHints(haikuArray, hints)

console.log({ hints, withHints })

// index.js
// process.stdin.on("data", data => {
//     data = data.toString().toUpperCase()
//     process.stdout.write(data + "\n")
// })
