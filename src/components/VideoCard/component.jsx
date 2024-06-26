import styles from './component.module.scss'

import { useRouter } from 'next/navigation'

import {
    Card,
    CardSection,
    Text,
    UnstyledButton,
    Image,
    Avatar,
    Badge,
} from '@mantine/core'

import { getYoutubeVideoID } from '@/libs/videoUtils'

export default function Component ({
    videoData,
})
{
    const router = useRouter()

    function getTimeDifference (oldTime)
    {
        const date_past = (new Date(oldTime)).getTime()
        const date_now = Date.now()
        const difference = (date_now - date_past) / 1000

        const days = Math.floor(difference / (3600*24))
        const hours = Math.floor(difference % (3600*24) / 3600)
        const minutes = Math.floor(difference % 3600 / 60)

        if (days >= 1) {
            return `${days}d ago`
        } else if (hours >= 1) {
            return `${hours}h ago`
        } else {
            return `${minutes}m ago`
        }
    }

    return (
        <UnstyledButton
            onClick={e => router.push(`/view/${videoData.id}`)}
            style={{height: "100%", width: "100%"}}
        >
            <Card
                className={styles.wrapper}
                shadow="md"
            >
                <CardSection>
                    <Image
                        src={`https://img.youtube.com/vi/${getYoutubeVideoID(videoData.video_url)}/0.jpg`}
                    />
                </CardSection>
                <CardSection
                    className={styles.infoSection}
                >
                    {/*<Avatar
                        src={null}
                        size="md"
                    />*/}
                    <div
                        className={styles.textInfo}
                    >
                        <h3>{videoData.title}</h3>
                        <div
                            className={styles.bot}
                        >
                            <Badge>
                                {videoData.user_id}
                            </Badge>
                            <div>{getTimeDifference(videoData.created_at)}</div>
                        </div>
                    </div>
                </CardSection>
            </Card>
        </UnstyledButton>
    )
}