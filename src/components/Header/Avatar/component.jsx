'use client'

import styles from './component.module.scss'

import {
    Menu,
    MenuTarget,
    MenuDropdown,
    MenuItem,
    MenuLabel,
    Avatar,
    ActionIcon,
} from '@mantine/core'
import { IconVideoPlus } from '@tabler/icons-react'
import { AddVideoModal } from '@/components'

import {
    useAuth,
    useWindowDimensions,
} from '@/hooks'
import { useRouter } from 'next/navigation'
import { useDisclosure } from '@mantine/hooks'

export default function Component ({
    //
})
{
    const {
        isAuthenticated,
        setIsAuthenticating,
        userData,
        deauthenticate,
    } = useAuth()
    const { width } = useWindowDimensions()
    const router = useRouter()

    const [videoModalOpened, {open:openVideoModal, close:closeVideoModal}] = useDisclosure(false)

    return (
        <>
            {isAuthenticated && (
                <>
                    <ActionIcon
                        className={styles.addVideoButton}
                        onClick={e => openVideoModal()}
                    >
                        <IconVideoPlus/>
                    </ActionIcon>
                    <AddVideoModal
                        modalOpened={videoModalOpened}
                        close={closeVideoModal}
                    />
                </>
            )}
            <Menu>
                <MenuTarget>
                    <div
                        className={styles.avatarLoggedInContainer}
                    >
                        <Avatar
                            src={null}
                            color="gray"
                        />
                        {(isAuthenticated && width > 768 ) && (
                            <div
                                className={styles.name}
                            >
                                {userData.username}
                            </div>
                        )}
                    </div>
                </MenuTarget>
                <MenuDropdown>
                    {isAuthenticated ? (
                        <>
                            <MenuLabel>{userData.username}</MenuLabel>
                            {/*<MenuItem
                                onClick={e => router.push(`/user/${userData.username}`)}
                            >
                                PROFILE
                            </MenuItem>*/}
                            <MenuItem
                                onClick={e => deauthenticate()}
                            >
                                LOGOUT
                            </MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem
                                onClick={e => setIsAuthenticating("login")}
                            >
                                LOGIN
                            </MenuItem>
                            <MenuItem
                                onClick={e => setIsAuthenticating("register")}
                            >
                                REGISTER
                            </MenuItem>
                        </>
                    )}
                </MenuDropdown>
            </Menu>
        </>
    )
}