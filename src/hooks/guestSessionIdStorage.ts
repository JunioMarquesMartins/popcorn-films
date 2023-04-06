import { useCallback, useEffect, useState } from 'react'
import { useGuestSessionId } from './moviesQuerys'
export function useSaveSessionId() {
  const [sessionId, setSessionId] = useState('')
  const TMDB_KEY = import.meta.env.VITE_TMDB_KEY
  const responseGuestSession = useGuestSessionId(
    `authentication/guest_session/new?api_key=${TMDB_KEY}`,
  )

  const saveGuestSessionId = useCallback(async () => {
    const isGuestSessionId = await localStorage.getItem(
      '@movie-app:guest-session-id-1.0.0',
    )
    if (isGuestSessionId === null) {
      const responseSessionId = await responseGuestSession.refetch()
      localStorage.setItem(
        '@movie-app:guest-session-id-1.0.0',
        responseSessionId.data,
      )

      setSessionId(
        String(localStorage.getItem('@movie-app:guest-session-id-1.0.0')),
      )
    } else {
      const isGuestSessionId = String(
        localStorage.getItem('@movie-app:guest-session-id-1.0.0'),
      )
      setSessionId(isGuestSessionId)
      console.log('sessionID', sessionId)
    }
  }, [sessionId, responseGuestSession])

  useEffect(() => {
    saveGuestSessionId()
  }, [saveGuestSessionId])

  return sessionId
}
