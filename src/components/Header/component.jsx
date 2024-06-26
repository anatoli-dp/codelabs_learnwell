'use client'

import styles from './component.module.scss'

import {
    Image,
    TextInput,
} from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import Avatar from './Avatar/component'

import {
    useWindowDimensions,
    useVideo,
} from '@/hooks'

import {
    usePathname,
    useRouter,
} from 'next/navigation'

export default function Component ({
    //
})
{
    const iconSearch = <IconSearch/>
    const { width } = useWindowDimensions()
    const {
        videoQueryText,
        setVideoQueryText,
        refreshVideosQuery,
        setRefreshVideosQuery,
    } = useVideo()

    const pathName = usePathname()
    const router = useRouter()
    function setVideoQuery ()
    {
        //when not in home sccreen we need to navigate there afterwards to see search results
        setRefreshVideosQuery(!refreshVideosQuery)
        if (pathName !== "/") router.push('/')
    }

    return (
        <div
            className={styles.wrapper}
        >
            <Image
                h={50}
                w="auto"
                //src={`${window.location.origin}/${width <= 768 ? "brand/LOGO_ICON.png" : "brand/FULL_LOGO_COLOR.png"}`}
                //src='/brand/FULL_LOGO_COLOR.png'
                src={`${width <= 768 ? "/brand/LOGO_ICON.png" : "/brand/FULL_LOGO_COLOR.png"}`}
            />
            <TextInput
                className={styles.textInput}
                rightSection={iconSearch}
                rightSectionPointerEvents="none"
                placeholder="Search Videos . . ."
                value={videoQueryText}
                onChange={e => setVideoQueryText(e.currentTarget.value)}
                onKeyPress={e => e.key === 'Enter' && setVideoQuery()}
            />
            <Avatar/>
        </div>
    )
}