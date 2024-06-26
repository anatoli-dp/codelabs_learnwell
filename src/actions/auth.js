//simple login database to control access into backend api . . .
'use server'

import db from '@/libs/db'

//both funcs just pass true/false as application already knows username and no data is being passed back

export async function authUser (username, password)
{
    let result = await db.prepare('SELECT * FROM users WHERE user = ?').get(username)
    if (typeof result === 'undefined') {
        //user doesnt exist (better-sqlite3 returns "undefined" on null result)
        return false
    } else {
        //password check . . . assumes data passed back is user
        return result.password === password
    }
}

export async function registerUser (firstName, lastName, password)
{
    const user = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`
    try {
        let result = await db.prepare('INSERT INTO users (user, password) VALUES (?, ?)').run(user, password)
        return true
    } catch (err) {
        //assume any error means couldnt create user due to unique key . . .
        //only for demonstration purposes we just need basic functionality so no proper error checking for now :(
        return false
    }
}