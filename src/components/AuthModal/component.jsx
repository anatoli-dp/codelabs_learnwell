'use client'

import styles from './component.module.scss'

import {
    useEffect,
    useState,
} from 'react'

import {
    Modal,
    TextInput,
    PasswordInput,
    Button,
} from '@mantine/core'

import { useDisclosure } from '@mantine/hooks'
import { useAuth } from '@/hooks'

export default function Component ({
    //
})
{
    //could access as ref so there isnt so much state . . . maybe change in future?
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const [registerError, setRegisterError] = useState('')

    const {
        isAuthenticating,
        setIsAuthenticating,
        register,
        authenticate,
    } = useAuth()
    const [modalOpened, {open:openModal, close:closeModal}] = useDisclosure(false)
    useEffect(() => {
        if (isAuthenticating == "login" || isAuthenticating == "register") {
            openModal()
        } else {
            setFirstName('')
            setLastName('')
            setUsername('')
            setPassword('')
            setLoginError('')
            setRegisterError('')
            if (modalOpened) closeModal()
        }
    }, [isAuthenticating]);

    function loginUser ()
    {
        authenticate(username, password)
        .then(res => {
            if (!res) setLoginError('username or password is incorrect')
        })
    }

    function registerUser ()
    {
        register(firstName, lastName, password)
        .then(res => {
            if (!res) setRegisterError('first and last name already registered')
        })
    }

    return (
        <Modal
            title="Authentication"
            opened={modalOpened}
            onClose={e => setIsAuthenticating(false)}
            overlayProps={{
                backdrop: 0.55,
                blur: 3,
            }}
        >
            {(isAuthenticating == "login") && (
                <div
                    className={styles.modal}
                >
                    <TextInput
                        label="USERNAME"
                        value={username}
                        onChange={e => setUsername(e.currentTarget.value)}
                        error={loginError}
                    />
                    <PasswordInput
                        label="PASSWORD"
                        value={password}
                        onChange={e => setPassword(e.currentTarget.value)}
                        error={loginError}
                    />
                    <Button
                        className={styles.button}
                        onClick={e => loginUser()}
                    >
                        LOGIN
                    </Button>
                </div>
            )}
            {(isAuthenticating == "register") && (
                <div
                    className={styles.modal}
                >
                    <TextInput
                        label="FIRST NAME"
                        value={firstName}
                        onChange={e => setFirstName(e.currentTarget.value)}
                        error={registerError}
                    />
                    <TextInput
                        label="LAST NAME"
                        value={lastName}
                        onChange={e => setLastName(e.currentTarget.value)}
                        error={registerError}
                    />
                    <PasswordInput
                        label="PASSWORD"
                        value={password}
                        onChange={e => setPassword(e.currentTarget.value)}
                    />
                    <Button
                        className={styles.button}
                        onClick={e => registerUser()}
                    >
                        REGISTER
                    </Button>
                </div>
            )}
        </Modal>
    )
}