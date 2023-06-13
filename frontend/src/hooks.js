import { useEffect, useState } from "react"

export default function useDailyHaiku() {
    const sourceURL = process.env.NODE_ENV === 'production'
        ? "https://raw.githubusercontent.com/wginsberg/haikudl/master/daily.txt"
        : "daily.txt"

        const [haikuString, setResult] = useState("")
    const [error, setError] = useState()

    useEffect(() => {
        fetch(sourceURL)
            .then(response => response.text())
            .then(text => text.endsWith("\n") ? text.slice(0, -1) : text)
            .then(setResult)
            .catch(setError)
    }, [sourceURL])

    return { haikuString, error }
}
