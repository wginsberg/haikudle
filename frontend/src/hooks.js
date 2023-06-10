import { useEffect, useState } from "react"

export default function useDailyHaiku() {

    // TODO - Check (process.env.NODE_ENV === 'production') here
    
    const sourceURL = "daily.txt"

    const [haikuString, setResult] = useState("")
    const [error, setError] = useState()

    useEffect(() => {
        fetch(sourceURL)
            .then(response => response.text())
            .then(setResult)
            .catch(setError)
    }, [])

    return { haikuString, error }
}
