import { useEffect, useRef, useState } from 'react'

export function useDailyHaiku () {
  const sourceURL = process.env.NODE_ENV === 'production'
    ? 'https://raw.githubusercontent.com/wginsberg/haikudl/master/daily.txt'
    : 'daily.txt'

  const [result, setResult] = useState('')
  const [error, setError] = useState()

  useEffect(() => {
    fetch(sourceURL)
      .then(response => response.text())
      .then(setResult)
      .catch(setError)
  }, [sourceURL])

  const [haikuString, date] = result.split('\n')

  return { haikuString, date, error }
}

export function useTemporaryState (initalState, timeout = 100) {
  const [state, setState] = useState(initalState)

  const setTemporaryState = newState => {
    setState(newState)
    setTimeout(
      () => setState(state =>
        state === newState
          ? initalState
          : newState),
      timeout
    )
  }

  return [state, setTemporaryState]
}

export function useLocalStorage (key = '', initialValue) {
  const item = JSON.parse(window.localStorage.getItem(key)) || initialValue
  const setItem = (newItem) => {
    window.localStorage.setItem(key, JSON.stringify(newItem))
  }
  return [item, setItem]
}

export function useRepeatedCall (toCall, initialDelay = 300, intervalDelay = 100) {
  const [isActive, setIsActive] = useState(false)
  const timeoutRef = useRef()
  const intervalRef = useRef()

  useEffect(() => {
    const cleanupIntervals = () => {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (isActive) {
      if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          intervalRef.current = setInterval(() => {
            console.log('1')
            toCall()
          }, intervalDelay)
        }, initialDelay)
      }
    } else {
      cleanupIntervals()
    }
    // return cleanup
  }, [toCall, initialDelay, intervalDelay, isActive])

  return setIsActive
}
