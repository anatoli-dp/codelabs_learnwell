//proxy for video context for communication between header and pages
//TODO::refactor header so middle man video context can be cut
'use client'

import { useContext } from 'react'
import { VideoContext } from '@/contexts'

export default function useVideo ()
{
    const videoState = useContext(VideoContext)

    return {
        refreshVideos: videoState.refreshVideos,
        setRefreshVideos: videoState.setRefreshVideos,
        videoQueryText: videoState.videoQueryText,
        setVideoQueryText: videoState.setVideoQueryText,
        refreshVideosQuery: videoState.refreshVideosQuery,
        setRefreshVideosQuery: videoState.setRefreshVideosQuery,
    }
}