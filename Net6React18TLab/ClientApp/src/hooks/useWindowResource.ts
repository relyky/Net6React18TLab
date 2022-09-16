import React, { useMemo, useState, useEffect, useReducer } from 'react'

//=============================================================================
/// ���νd��
/// useInterval(2000, () => {
///    setCount(currentCount => currentCount + 1);
/// });

export function useInterval(ms: number, callback: () => void) {
  useEffect(() => {
    const timer = setInterval(callback, ms)
    return () => clearInterval(timer)
  }, [ms, callback]);
}

//=============================================================================
/// ���νd��
/// const [foo, setFoo] = useSessionStorage('foo')

export function useSessionStorage(key: string, initState: object | null = null) {
  const [changed, toggleChanged] = useReducer((f) => !f, true) // to indicate the "localStorage value" has changed.

  function setValue(newState: object) {
    sessionStorage.setItem(key, JSON.stringify(newState))
    toggleChanged()
  }

  const value = useMemo(() => {
    const strValue = sessionStorage.getItem(key)
    if (strValue == null) {
      if (typeof initState === 'object') {
        sessionStorage.setItem(key, JSON.stringify(initState));
        return initState
      }
      return null
    }

    return JSON.parse(strValue as string)
  }, [key, changed])

  return [value, setValue]
}

//=============================================================================
/// ���νd��
/// const position = useWindowSize()

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  function handleMouseMove(e) {
    setPosition({ x: e.pageX, y: e.pageY })
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  //useDebugValue(position)
  return position
}

//=============================================================================
/// ���νd��
/// const size = useWindowSize()

export function useWindowSize() {
  const [size, setSize] = useState({ w: 0, h: 0 })

  function handleResize(e) {
    setSize({ w: e.target.innerWidth, h: e.target.innerHeight })
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    window.dispatchEvent(new Event('resize')) // �ߧY���Ĳ�o�T���H���o size �C
    return () => window.removeEventListener("resize", handleResize)
  }, []) // ���P componentDidMount

  //useDebugValue(size)
  return size
}

//=============================================================================