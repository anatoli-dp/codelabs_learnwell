'use client'

import {
    Header,
    AuthModal,
} from '@/components'

import {
    usePathname,
    useRouter,
} from 'next/navigation'
import {
    useEffect,
    useState,
} from 'react'

import { useAuth } from '@/hooks'

export default function Layout ({
    children
})
{
    const pathName = usePathname()
    const router = useRouter()
    const { isAuthenticated } = useAuth()

    //loading needed so page doesn't flash when redirecting due to auth
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        if (pathName.startsWith("/user") && !isAuthenticated) {
            //not authenticated, redirect to login
            router.replace('/')
        } else {
            //clear to go wherever u want so disable loading to view page
            setLoading(false)
        }
    }, [pathName]);

    return (
        <>
            <Header/>
            {loading ? (
                <>
                    loading . . .
                </>
            ) : (
                <>
                    <AuthModal/>
                    {children}
                </>
            )}
        </>
    )
}