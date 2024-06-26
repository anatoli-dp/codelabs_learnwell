import styles from './component.module.scss'

import {
    Card,
    CardSection,
} from '@mantine/core'

export default function Component ({
    videoData
})
{
    //

    return (
        <Card
            className={styles.wrapper}
            shadow="md"
        >
            <h1>{videoData.title}</h1>
            <div
                className={styles.divider}
            />
            <p>{videoData.description}</p>
        </Card>
    )
}