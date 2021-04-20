import React, { MutableRefObject, useEffect, useState } from 'react'

function useHover(node: HTMLDivElement | null) {
    const [isHover, setIsHover] = useState(false)

    const on = () => setIsHover(true)
    const off = () => setIsHover(false)

    useEffect(() => {
        node?.addEventListener('mouseenter', on)
        node?.addEventListener('mousemove', on)
        node?.addEventListener('mouseleave', off)
        return () => {
            node?.removeEventListener('mouseenter', on)
            node?.removeEventListener('mousemove', on)
            node?.removeEventListener('mouseleave', off)
        }
    }, [isHover]) 
    return {
        isHover
    }
}

export default useHover 
