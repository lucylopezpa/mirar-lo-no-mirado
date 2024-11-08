import type { FC, PropsWithChildren } from "react"
import { twMerge } from 'tailwind-merge'

const RoomSection: FC<PropsWithChildren<{ className?: string }>> = ({ className, children }) => {
  return (
    <section
      className={twMerge(
        "h-full flex flex-col px-6 pb-2",
        className,
      )}
    >
      <div className="grow shrink"></div>
      <div className="grow shrink-0">
        {children}
      </div>
      <div className="grow shrink"></div>
    </section>
  )
}

export default RoomSection
