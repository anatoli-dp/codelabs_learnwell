import styles from './component.module.scss'

import {
    Card,
    CardSection,
    Badge,
} from '@mantine/core'

export default function Component ({
    comment
})
{
    //

    return (
        <Card
            className={styles.wrapper}
            shadow="xs"
        >
            <h4>{comment.user_id}</h4>
            <p>{comment.content}</p>
        </Card>
    )
}