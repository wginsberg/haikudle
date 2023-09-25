import { useCallback, useEffect, useRef, useState } from 'react'
import { numWordsSolved } from './util'

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

export function useHintButtonShake (censoredHaiku, timeout = 10000, maxShakes = 2) {
  const timeoutRef = useRef()
  const [shouldShake, setShouldShake] = useTemporaryState(false, 5000)
  const [shakeCount, setShakeCount] = useState(0)

  const shake = useCallback(() => {
    if (shakeCount > maxShakes) return
    setShouldShake(true)
    setShakeCount(count => count + 1)
  }, [shakeCount, maxShakes, setShouldShake])

  // Shake once after initial timeout
  useEffect(() => {
    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(shake, timeout)
    }
  }, [shake, timeout])

  // Shake if the player reached the end without winning
  const noGuessesLeft = !censoredHaiku.includes('*')
  if (noGuessesLeft && shouldShake === false) {
    shake()
  }

  return shouldShake
}
