'use client'

import { createContext } from 'react'

export const AuthContext = createContext(null)
export { default as AuthProvider } from './authProvider'

//context needed here cause video add modal placed outside of home page (is in header)
export const VideoContext = createContext(null)
export { default as VideoProvider } from './videoProvider'