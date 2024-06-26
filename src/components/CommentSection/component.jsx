'use client'

import styles from './component.module.scss'

import {
    useState,
    useEffect,
} from 'react'

import {
    Card,
    CardSection,
    TextInput,
    Button,
    Center,
} from '@mantine/core'

import CommentCard from './CommentCard/component'
import { useAuth } from '@/hooks'
import { notifications } from '@mantine/notifications'

import {
    getComments,
    submitComment,
} from '@/actions/videos'

export default function Component ({
    videoData
})
{
    const {
        isAuthenticated,
        userData,
    } = useAuth()
    const [comments, setComments] = useState([])
    useEffect(() => {
        fetchComments()
    }, [videoData])

    async function fetchComments ()
    {
        const c = await getComments(videoData.id)
        setComments(c.reverse())
    }

    const [commentText, setCommentText] = useState('')
    async function addComment ()
    {
        if (!isAuthenticated)
        {
            notifications.show({
                title: 'MUST BE LOGGED IN TO COMMENT',
                message: 'add comment error',
                color: 'red',
            })
            return
        }

        const text = commentText.trim()
        if (text.length > 0) {
            await submitComment(commentText, userData.username, videoData.id)
            fetchComments()
            setCommentText('')
        }
    }

    return (
        <div
            className={styles.wrapper}
        >
            <Card
                className={styles.card}
                shadow="md"
            >
                <CardSection
                    className={styles.inputContainer}
                >
                    <h3>COMMENTS</h3>
                    <TextInput
                        value={commentText}
                        onChange={e => setCommentText(e.currentTarget.value)}
                    />
                    <Button
                        onClick={e => addComment()}
                    >
                        ADD COMMENT
                    </Button>
                </CardSection>
                <CardSection
                    className={styles.commentContainer}
                >
                    {(comments.length == 0) && (
                        <Center>
                            no comments
                        </Center>
                    )}
                    {comments.map((comment, i) => (
                        <CommentCard
                            key={i}
                            comment={comment}
                        />
                    ))}
                </CardSection>
            </Card>
        </div>
    )
}