'use client'

import styles from './component.module.scss'

import {
    Modal,
    TextInput,
    Textarea,
    Button,
} from '@mantine/core'

import {
    useState,
} from 'react'

import { submitVideo } from '@/actions/videos'
import { isValidYoutubeUrl } from '@/libs/videoUtils'
import {
    useAuth,
    useVideo,
} from '@/hooks'

export default function Component ({
    modalOpened,
    close,
})
{
    const { userData } = useAuth()
    const {
        refreshVideos,
        setRefreshVideos,
    } = useVideo()

    const [videUrl, setVideoUrl] = useState('')
    const [videoTitle, setVideoTitle] = useState('')
    const [videoDes, setVideoDes] = useState('')

    const [videoUrlError, setVideoUrlError] = useState('')

    function clearFields ()
    {
        setVideoUrl('')
        setVideoTitle('')
        setVideoDes('')

        setVideoUrlError('')
    }

    async function addVideo ()
    {
        setVideoUrl(videUrl.trim())
        setVideoTitle(videoTitle.trim())
        setVideoDes(videoDes.trim())

        if (!isValidYoutubeUrl(videUrl)) {
            setVideoUrlError('url must be a valid youtube link')
            return
        }

        const res = await submitVideo(userData.username, videoDes, videUrl, videoTitle)
        clearFields()
        setRefreshVideos(!refreshVideos)
        close()
    }

    function exitModal ()
    {
        clearFields()
        close()
    }

    return (
        <Modal
            title="ADD VIDEO"
            opened={modalOpened}
            onClose={e => exitModal()}
            overlayProps={{
                backdrop: 0.55,
                blur: 3,
            }}
            size="xl"
        >
            <div
                className={styles.modal}
            >
                <TextInput
                    label="VIDEO URL"
                    value={videUrl}
                    onChange={e => setVideoUrl(e.currentTarget.value)}
                    error={videoUrlError}
                />
                <TextInput
                    label="VIDEO TITLE"
                    value={videoTitle}
                    onChange={e => setVideoTitle(e.currentTarget.value)}
                />
                <Textarea
                    label="VIDEO DESCRIPTION"
                    autosize
                    minRows={8}
                    resize="vertical"
                    value={videoDes}
                    onChange={e => setVideoDes(e.currentTarget.value)}
                />
                <Button
                    onClick={e => addVideo()}
                >
                    SUBMIT
                </Button>
            </div>
        </Modal>
    )
}