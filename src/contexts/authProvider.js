'use client'

import { AuthContext } from '.'
import {useState} from "react";

import {
    authUser,
    registerUser,
} from '@/actions/auth'

export default function AuthProvider ({
    children
})
{
    //for simplicity, we will keep all user variables in memory instead of as a cookie . . . means data loss on refresh but for a demonstration it dont matter
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAuthenticating, setIsAuthenticating] = useState(false) //needed for login/register modal control
    const [userData, setUserData] = useState(null) //only stores {username:?} but we could start adding more if we want to expand the application for custom additions

    async function register (firstName, lastName, password)
    {
        //TODO > add basic input validation to prevent special characters (i.e. user could have first/last name inlcude '_' so more than one added and therefore not be like what api needs)
        const res = await registerUser(firstName, lastName, password)
        if (res) {
            //register passes back true so we dont 'need' to reauth afterwards as we know values are correct . . . do not do in real life . . .
            //just do same as what is in auth function as we know it to be good data
            const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`
            setUserData({ username: username })
            setIsAuthenticated(true)
            setIsAuthenticating(false)

            return true
        }

        return false
    }

    async function authenticate (username, password)
    {
        const res = await authUser(username, password)
        if (res) {
            setUserData({ username: username })
            setIsAuthenticated(true)
            setIsAuthenticating(false)

            return true
        }
        return false
    }

    async function deauthenticate ()
    {
        setUserData(null)
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: isAuthenticated,
                isAuthenticating: isAuthenticating,
                setIsAuthenticating: setIsAuthenticating,
                register: register,
                authenticate: authenticate,
                deauthenticate: deauthenticate,
                userData: userData,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}