import React, { createContext, useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'

export const RedditContext = createContext()

export const RedditProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  useEffect(() => {
    const { user } = supabase.auth.session() || { user: null }
    setCurrentUser(user)

    // console.log(currentUser)

    supabase.auth.onAuthStateChange((_event, authSession) => {
      setCurrentUser(authSession.user)
    })
  }, [currentUser])

  return (
    <RedditContext.Provider value={{ currentUser, fetcher }}>
      {children}
    </RedditContext.Provider>
  )
}
