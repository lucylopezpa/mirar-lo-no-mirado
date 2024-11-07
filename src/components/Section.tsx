import type { DetailedHTMLProps, FC, PropsWithChildren, HTMLAttributes } from "react"
import { twMerge } from 'tailwind-merge'

interface SectionProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  centerContent?: boolean
}

const Section: FC<PropsWithChildren<SectionProps>> = ({ centerContent = true, className, children }) => {
  return (
    <section
      className={twMerge(
        "h-full flex flex-col px-8 pb-2",
        className,
        centerContent && "justify-center",
      )}
    >
      {children}
    </section>
  )
}

export default Section
