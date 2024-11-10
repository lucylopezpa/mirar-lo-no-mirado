import { useRef, useState, type FC } from "react"
import { useIntersectionObserver } from "usehooks-ts";

const Layered: FC<{ background: string; foreground: string; alt?: string }> = ({ background, foreground, alt = "" }) => {
  const foregroundRef = useRef<HTMLImageElement>(null)

  const { ref } = useIntersectionObserver({
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    onChange(isIntersecting, entry) {
      if (!isIntersecting) return
      const opacity = (1 - entry.intersectionRatio) / 0.2
      if (foregroundRef.current) {
        foregroundRef.current.style.opacity = opacity + ''
      }
    }
  })

  return (
    <div className="relative" ref={ref}>
      <img src={background} alt={alt} />
      <img src={foreground} className="absolute top-0 left-0" style={{ opacity: '0' }} ref={foregroundRef} alt={alt} />
    </div>
  )
}

export default Layered
