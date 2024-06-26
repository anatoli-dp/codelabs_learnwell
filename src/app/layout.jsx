import './globals.scss'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

import {
    AuthProvider,
    VideoProvider,
} from '@/contexts'

import {
    ColorSchemeScript,
    MantineProvider,
    createTheme,
} from '@mantine/core'
import { Notifications } from '@mantine/notifications'

const theme = createTheme({
    primaryColor: 'learnwell-green',
    colors: {
        'learnwell-green': [
            '#e3fcf7',
            '#d7f4ec',
            '#b4e5d8',
            '#8dd5c2',
            '#6dc8af',
            '#57c0a3',
            '#4abc9d',
            '#38a689',
            '#2b9378',
            '#138067'
        ]
    }
})

export const metadata = {
    title: 'Learnwell',
    description: 'Learnwell Web App',
}

export default function RootLayout ({
    children
})
{
    //

    return (
        <html
            lang="en"
        >
            <head>
                <ColorSchemeScript/>
            </head>
            <body>
                <AuthProvider>
                    <VideoProvider>
                        <MantineProvider
                            theme={theme}
                        >
                            <Notifications/>
                            {children}
                        </MantineProvider>
                    </VideoProvider>
                </AuthProvider>
            </body>
        </html>
    )
}