import React, { useEffect, useRef } from "react"

export default function useScroll(parentRef: HTMLElement | undefined, childrenRef: HTMLElement | undefined, cb: any) {
  const observer = useRef<any>()

  useEffect(() => {
    const options = {
      root: parentRef,
      threshold: 0,
    }

    observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        cb()
      }
    }, options)

    if (childrenRef) {
      observer.current.observe(childrenRef)
    }

    return () => {
      if (childrenRef) {
        observer.current.unobserve(childrenRef)
      }
    }
  }, [cb])
}
