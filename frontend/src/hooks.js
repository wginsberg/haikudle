import { useEffect, useRef, useState } from 'react'
import { numWordsSolved } from './util'

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
  }, [toCall, initialDelay, intervalDelay, isActive])

  return setIsActive
}

export function useIsPlayerMakingProgess (censoredHaiku, haiku, hints, interval = 15000) {
  const intervalRef = useRef()
  const [isProgressing, setIsProgressing] = useState(true)
  const lastHintsRef = useRef()
  const hintsRef = useRef()
  const lastNumWordsSolvedRef = useRef()
  const numWordsSolvedRef = useRef()

  // need to write this every time to access in closure of setTimeout
  hintsRef.current = new Set(hints)
  numWordsSolvedRef.current = numWordsSolved(censoredHaiku, haiku)

  useEffect(() => {
    if (!intervalRef.current) {
      lastHintsRef.current = new Set(hints)
      lastNumWordsSolvedRef.current = numWordsSolved(censoredHaiku, haiku)

      intervalRef.current = setInterval(() => {
        const areHintsEqual = [...lastHintsRef.current].join() === [...hintsRef.current].join()
        const isNumWordsSolvedEqual = numWordsSolvedRef.current === lastNumWordsSolvedRef.current

        if (areHintsEqual && isNumWordsSolvedEqual) {
          setIsProgressing(false)
          clearInterval(intervalRef.current)
        } else {
          lastHintsRef.current = hintsRef.current
          lastNumWordsSolvedRef.current = numWordsSolvedRef.current
        }
      }, interval)
    }
  }, [censoredHaiku, haiku, hints, interval])

  return isProgressing
}
