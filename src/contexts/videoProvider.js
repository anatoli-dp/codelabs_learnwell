//this ties state between the header and pages to allow for video queries/additions
'use client'

import { VideoContext } from '.'
import { useState } from 'react'

export default function VideoProvider ({
    children
})
{
    const [refreshVideos, setRefreshVideos] = useState(false)
    const [videoQueryText, setVideoQueryText] = useState('')
    const [refreshVideosQuery, setRefreshVideosQuery] = useState(false)

    return (
        <VideoContext.Provider value={{
            refreshVideos: refreshVideos,
            setRefreshVideos: setRefreshVideos,
            videoQueryText: videoQueryText,
            setVideoQueryText: setVideoQueryText,
            refreshVideosQuery: refreshVideosQuery,
            setRefreshVideosQuery: setRefreshVideosQuery,
        }}>
            {children}
        </VideoContext.Provider>
    )
}