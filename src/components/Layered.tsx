
import clsx from "clsx"
import { useEffect, useRef, type DetailedHTMLProps, type FC, type HTMLAttributes } from "react"

interface LayeredProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  background: string
  foreground: string
  alt?: string
}

const Layered: FC<LayeredProps> = ({ background, foreground, alt = "", className = 'relative' }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const foregroundRef = useRef<HTMLImageElement>(null)

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const opacity = 1 - entry.intersectionRatio
        // @ts-ignore
        foregroundRef.current.style.opacity = Math.min(opacity * 5, 1)
      }
    })
  }, {
    threshold: [0.7, 0.8, 0.9, 1]
  })

  useEffect(() => {
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  return (
    <div className={clsx(className)} ref={containerRef}>
      <img className="w-full h-auto" src={background} alt={alt} />
      <img
        ref={foregroundRef}
        src={foreground}
        className="absolute top-0 left-0 w-full h-auto"
        style={{ opacity: '0' }}
        alt={alt}
      />
    </div>
  )
}

export default Layered
