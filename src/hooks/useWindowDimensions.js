'use client'

import {
    useState,
    useEffect,
} from 'react'

function getWindowDimensions ()
{
    const { innerWidth: width, innerHeight: height } = window
    return {
        width,
        height,
    }
}

export default function useWindowDimensions ()
{
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        // component is mounted and window is available
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        // unsubscribe from the event on component unmount
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return {
        width: width,
        height: height,
    }
}