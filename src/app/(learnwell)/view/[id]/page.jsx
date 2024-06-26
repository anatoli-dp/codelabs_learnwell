'use client'

import styles from './page.module.scss'

import {
    useState,
    useEffect,
} from 'react'
import { useParams } from 'next/navigation'

import {
    LoadingOverlay,
} from '@mantine/core'
import {
    VideoPlayer,
    VideoInfo,
    CommentSection,
} from '@/components'

import { getVideo } from '@/actions/videos'
import { getYoutubeVideoID } from '@/libs/videoUtils'

export default function Page ({
    //
})
{
    const { id:videoID } = useParams()

    const [videoData, setVideoData] = useState({})
    const [videoLink, setVideoLink] = useState(null)

    useEffect(() => {
        async function getVideoData ()
        {
            const vd = await getVideo(videoID)
            setVideoData(vd)
            setVideoLink(`https://www.youtube.com/embed/${getYoutubeVideoID(vd.video_url)}`)
        }

        getVideoData()
    }, []);

    return (
        <div
            className={styles.wrapper}
        >
            <div
                className={styles.left}
            >
                <VideoPlayer
                    videoLink={videoLink}
                />
                <VideoInfo
                    videoData={videoData}
                />
            </div>
            <CommentSection
                videoData={videoData}
            />
        </div>
    )
}