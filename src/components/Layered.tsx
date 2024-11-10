
import clsx from "clsx"
import { useEffect, useRef, type DetailedHTMLProps, type FC, type HTMLAttributes } from "react"
import ScrollMagic from 'scrollmagic'

interface LayeredProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  background: string
  foreground: string
  alt?: string
}

const Layered: FC<LayeredProps> = ({ background, foreground, alt = "", className = 'relative' }) => {
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
    <div className={clsx(className)}>
      <img className="w-full h-auto" src={background} alt={alt} />
      <img src={foreground} className="absolute top-0 left-0 w-full h-auto" style={{ opacity: '0' }} ref={foregroundRef} alt={alt} />
    </div>
  )
}

export default Layered
