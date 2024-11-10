import { useState, type FC } from "react"
import fullscreenIcon from "../icons/fullscreen.svg"
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Drawer } from "vaul";
import arrowUpIcon from '../icons/arrow-up.svg'
import xIcon from '../icons/x.svg'
import clsx from "clsx";
import { getImageMetadata } from "../scripts/gallery";
import { saveAs } from 'file-saver'

type RoomImageProps = {
  id: string
}

const RoomImage: FC<RoomImageProps> = ({ id }) => {
  const [animationEnded, setAnimationEnded] = useState<Boolean | null>()
  const data = getImageMetadata(id)

  if (!data) {
    return null
  }

  const { metadata, csv } = data

  const { 'Descripción': description, Imagen: image, Fecha: date, 'Fotógrafa': author, Fuente: source, 'Cobertura geográfica': place, 'Técnica': technique, 'Declaración de derechos': copyright, 'Soporte físico': support } = metadata

  const downloadCSV = () => {
    const csvContent = csv
      .filter(([_, value]) => value.trim() !== "")
      .map(([key, value]) => `"${key}","${value.replace(/"/g, '""')}"`)
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    saveAs(blob, "data.csv");
  };


  return (
    <>
      <div className="relative">
        <img
          src={image}
          alt={description}
          className="w-full max-w-lg h-auto shadow-lg"
        />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button type="button" className="top-2 right-2 absolute">
              <img src={fullscreenIcon.src} className="size-8 shadow-2xl" alt="" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-eerie-black z-10" />
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full py-8 z-10 flex flex-col items-start justify-center">
              <VisuallyHidden.Root>
                <Dialog.Title>Título</Dialog.Title>
                <Dialog.Description>Descripción</Dialog.Description>
              </VisuallyHidden.Root>
              <div className="absolute top-6 right-8 z-[1]">
                <Dialog.Close>
                  <img src={xIcon.src} className="size-6" alt="" />
                </Dialog.Close>
              </div>
              <TransformWrapper centerOnInit>
                <TransformComponent wrapperStyle={{
                  width: '100dvw'
                }} contentStyle={{ width: '100%' }}>
                  <img
                    src={image}
                    alt={description}
                    className="mx-auto"
                  />
                </TransformComponent>
              </TransformWrapper>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <Drawer.Root onAnimationEnd={setAnimationEnded}>
        <Drawer.Trigger asChild>
          <div className={clsx("absolute py-2 px-6 left-0 bottom-12 w-full z-[1] bg-eerie-black", { 'invisible': animationEnded !== null && animationEnded })}>
            <div className="absolute left-0 top-0 w-full -translate-y-full">
              <div className="flex w-full items-baseline">
                <div className="h-px bg-white grow"></div>
                <svg width="57" height="28" viewBox="0 0 57 28" fill="#222222" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M56.458 27.23c-5.204 0-9.428-4.23-9.428-9.44v-3.37C47.03 7.01 41.027 1 33.627 1H22.83C15.43 1 9.428 7.01 9.428 14.42v3.37c0 5.21-4.225 9.44-9.428 9.44" stroke="#fff" /></svg>
                <div className="h-px bg-white w-2 -translate-x-0.5"></div>
              </div>
            </div>
            <button className="absolute bottom-full cursor-pointer size-10 flex items-center justify-center right-4 pt-5 border-b border-eerie-black">
              <img src={arrowUpIcon.src} alt="" />
            </button>
            <p className="line-clamp-2">{description}</p>
          </div>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-eerie-black/40 z-10" />
          <Drawer.Content className="flex flex-col mt-24 h-[80%] fixed bottom-0 left-0 right-0 outline-none z-10">
            <div className="py-4 px-6 bg-eerie-black flex-1 overflow-y-auto">
              <div className="max-w-md mx-auto">
                <div aria-hidden className="absolute w-full left-0 -top-7">
                  <div className="flex w-full items-baseline">
                    <div className="h-px bg-white grow"></div>
                    <svg width="57" height="28" viewBox="0 0 57 28" fill="#222222" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M56.458 27.23c-5.204 0-9.428-4.23-9.428-9.44v-3.37C47.03 7.01 41.027 1 33.627 1H22.83C15.43 1 9.428 7.01 9.428 14.42v3.37c0 5.21-4.225 9.44-9.428 9.44" stroke="#fff" /></svg>
                    <div className="h-px bg-white w-2 -translate-x-0.5"></div>
                  </div>
                  <Drawer.Close className="absolute cursor-pointer size-10 flex items-center justify-center right-4 border-b border-eerie-black -top-6 translate-y-1/2">
                    <img src={arrowUpIcon.src} className="rotate-180" alt="" />
                  </Drawer.Close>
                </div>
                <VisuallyHidden.Root>
                  <Drawer.Title>Detalle {id}</Drawer.Title>
                  <Drawer.Description>{description}</Drawer.Description>
                </VisuallyHidden.Root>
                <div className="space-y-5">
                  <p>{description}</p>
                  {date && <div className="space-y-1">
                    <h3 className="italic font-antarctican-mono">Fecha</h3>
                    <p>{date}</p>
                  </div>}
                  {author && (
                    <div className="space-y-1">
                      <h3 className="italic font-antarctican-mono">Fotógrafa</h3>
                      <p>{author}</p>
                    </div>
                  )}
                  {source && (
                    <div className="space-y-1">
                      <h3 className="italic font-antarctican-mono">Fuente</h3>
                      <p>{source}</p>
                    </div>
                  )}
                  {place && (
                    <div className="space-y-1">
                      <h3 className="italic font-antarctican-mono">Cobertura geográfica</h3>
                      <p>{place}</p>
                    </div>
                  )}
                  {support && (
                    <div className="space-y-1">
                      <h3 className="italic font-antarctican-mono">Soporte físico</h3>
                      <p>{support}</p>
                    </div>
                  )}
                  {technique && (
                    <div className="space-y-1">
                      <h3 className="italic font-antarctican-mono">Técnica</h3>
                      <p>{technique}</p>
                    </div>
                  )}
                  {copyright && (
                    <div className="space-y-1">
                      <h3 className="italic font-antarctican-mono">Declaración de derechos</h3>
                      <p>{copyright}</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-center mt-10">
                  <button className="px-4 font-antarctican-mono uppercase border-b pb-2 inline-flex items-center gap-4" onClick={() => downloadCSV()}>
                    <span>Descargar metadatos</span>
                    <img src={arrowUpIcon.src} className="size-4 rotate-180" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}

export default RoomImage
