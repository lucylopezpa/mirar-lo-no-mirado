
import clsx from "clsx"
import { useEffect, useRef, type DetailedHTMLProps, type FC, type HTMLAttributes } from "react"
import ScrollMagic from 'scrollmagic'
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'

interface LayeredProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  background: string
  foreground: string
  alt?: string
}

const Layered: FC<LayeredProps> = ({ background, foreground, alt = "", className = 'relative' }) => {
  const triggerRef = useRef<HTMLDivElement>(null)
  const foregroundRef = useRef<HTMLImageElement>(null)


  useEffect(() => {
    if (!foregroundRef.current || !triggerRef.current) return

    const controller = new ScrollMagic.Controller({
      vertical: false,
      loglevel: 3
    })

    const scene = new ScrollMagic.Scene({
      triggerElement: triggerRef.current,
      duration: triggerRef.current.scrollWidth / 2,
      triggerHook: 'onCenter',
    })
    .addTo(controller)
    // .addIndicators()

    scene.on("progress", function(event) {
      // @ts-expect-error event.progress is not typed
      foregroundRef.current!.style.opacity = event.progress + ''
    })
    return () => {
      scene.destroy()
    }
  }, [foregroundRef])

  return (
    <div className={clsx(className)}>
      <img className="w-full h-auto" src={background} alt={alt} />
      <div className="absolute top-0 left-1/2 w-1/2 h-full" ref={triggerRef}></div>
      <img src={foreground} className="absolute top-0 left-0 w-full h-auto" style={{ opacity: '0' }} ref={foregroundRef} alt={alt} />
    </div>
  )
}

export default Layered
