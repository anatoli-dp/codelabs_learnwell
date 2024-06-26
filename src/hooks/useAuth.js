//auth hook here is just a proxy of auth context so importing context and consuming context is not needed everywhere values are used!!!
//just makes things more simple when auth values are needed
'use client'

import { useContext } from 'react'
import { AuthContext } from '@/contexts'

export default function useAuth ()
{
    const auth = useContext(AuthContext)

    return {
        isAuthenticated: auth.isAuthenticated,
        isAuthenticating: auth.isAuthenticating,
        setIsAuthenticating: auth.setIsAuthenticating,
        register: auth.register,
        authenticate: auth.authenticate,
        deauthenticate: auth.deauthenticate,
        userData: auth.userData,
    }
}