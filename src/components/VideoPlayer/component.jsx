'use client'

import styles from './component.module.scss'

import { useState } from 'react'

import {
    AspectRatio,
} from '@mantine/core'

export default function Component ({
    videoLink
})
{
    //

    return (
        <AspectRatio
            className={styles.wrapper}
            ratio={16/9}
        >
            <iframe
                src={videoLink}
                allowFullScreen
            />
        </AspectRatio>
    )
}