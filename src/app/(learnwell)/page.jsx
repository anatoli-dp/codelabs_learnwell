'use client'

import styles from './page.module.scss'

import {
    useState,
    useEffect,
} from 'react'

import { SimpleGrid } from '@mantine/core'
import { VideoCard } from '@/components'

import {
    getVideos,
    getVideosQuery,
} from '@/actions/videos'

import { useVideo } from '@/hooks'

export default function Page ({
    //
})
{
    const [videosList, setVideosList] = useState([])
    const {
        refreshVideos,
        videoQueryText,
        refreshVideosQuery,
    } = useVideo()

    //video query does same as below as well as grab filtered data so this is duplicate
    /*useEffect(() => {
        (async function () {
            //grab new video data and set
            const videos = await getVideos()
            setVideosList(videos)
        })()
    }, [refreshVideos])*/

    useEffect(() => {
        (async function () {
            //grab video data based on search result from header
            const videos = await getVideosQuery(videoQueryText.trim())
            setVideosList(videos)
        })()
    }, [refreshVideos, refreshVideosQuery]);

    /*return (
        <div
            className={styles.wrapper}
        >
            {videosList.map((video) => (
                <VideoCard
                    videoData={video}
                />
            ))}
        </div>
    )*/
    return (
        <SimpleGrid
            //cols={4}
            cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
            spacing="xs"
            verticalSpacing="xs"
        >
            {videosList.map((video) => (
                <div
                    className={styles.cardWrapper}
                >
                    <VideoCard
                        videoData={video}
                    />
                </div>
            ))}
        </SimpleGrid>
    )
}