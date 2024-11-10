import { useEffect, useRef, useState, type FC } from "react"
import { useIntersectionObserver } from "usehooks-ts";
import ScrollMagic from 'scrollmagic'

const Layered: FC<{ background: string; foreground: string; alt?: string }> = ({ background, foreground, alt = "" }) => {
  const controller = new ScrollMagic.Controller({
    vertical: false,
  })
  const foregroundRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!foregroundRef.current) return
    const scene = new ScrollMagic.Scene({
      triggerElement: foregroundRef.current,
      duration: '10%',
      triggerHook: 'onLeave',
    })
    .addTo(controller)
    scene.on("progress", function(event) {
      // @ts-expect-error scrollmagic event is not _typed_
      foregroundRef.current.style.opacity = event.progress
    })
    return () => {
      scene.destroy()
    }
  }, [foregroundRef])

  return (
    <div className="relative">
      <img src={background} alt={alt} />
      <img src={foreground} className="absolute top-0 left-0" style={{ opacity: '0' }} ref={foregroundRef} alt={alt} />
    </div>
  )
}

export default Layered
