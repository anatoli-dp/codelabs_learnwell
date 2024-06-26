'use server'

import db from '@/libs/db'
import axios from 'axios'
import fuzzysort from 'fuzzysort'

import { isValidYoutubeUrl } from '@/libs/videoUtils'

const API_URL = 'https://take-home-assessment-423502.uc.r.appspot.com/api'
let videoList = []

export async function getVideos ()
{
    videoList = []
    const users = await db.prepare('SELECT user FROM users').all()
    for (let i = 0; i < users.length; i++) {
        const user = users[i].user
        try {
            const result = await axios.get(`${API_URL}/videos?user_id=${user}`)
            result.data.videos.forEach(vid => {
                const isValid = isValidYoutubeUrl(vid.video_url)
                if (isValid) videoList.push(vid)
            })
        } catch (err) {
            console.log(err)
        }
    }

    return videoList
}

export async function getVideosQuery (queryString)
{
    const initialList = await getVideos()
    const result = fuzzysort.go(queryString, initialList, {
        key: 'title',
        all: true,
        limit: queryString ? 100 : 1000,
        threshold: .5,
    })
    .map((v, i, a) => {
        //map over to remove additional stuff included from fuzzysort . . . only need referenced 'obj' from value
        if (v.obj) return v.obj
    })

    return result
}

export async function getVideo (videoID)
{
    try {
        const result = await axios.get(`${API_URL}/videos/single?video_id=${videoID}`)
        return result.data.video
    } catch (err) {
        console.log(err)
        return {}
    }
}

export async function submitVideo (user_id, description, video_url, title)
{
    const v = {
        user_id: user_id,
        description: description,
        video_url: video_url,
        title: title,
    }

    try {
        const result = await axios.post(`${API_URL}/videos`, v)
        console.log(result.data)
        return true
    } catch (err) {
        console.log(err)
        return false
    }

    return false
}

export async function getComments (videoID)
{
    try {
        const result = await axios.get(`${API_URL}/videos/comments?video_id=${videoID}`)
        return result.data.comments
    } catch (err) {
        console.log(err)
        return []
    }
}

export async function submitComment (comment, user_id, video_id)
{
    const c = {
        video_id: video_id,
        content: comment,
        user_id: user_id,
    }
    try {
        const result = await axios.post(`${API_URL}/videos/comments`, c)
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}