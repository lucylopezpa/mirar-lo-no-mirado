import { type FC } from "react"
import Section from "./Section"
import fullscreenIcon from "../icons/fullscreen.svg"
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Drawer } from "vaul";
import arrowUpIcon from '../icons/arrow-up.svg'
import xIcon from '../icons/x.svg'

type RoomImageProps = {
  image: string
  room: string
}

const RoomImage: FC<RoomImageProps> = ({ image, room }) => {
  return (
    <>
      <div className="relative">
        <img
          src={image}
          alt={room}
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
              <div className="absolute top-6 right-8">
                <Dialog.Close>
                  <img src={xIcon.src} className="size-6" alt="" />
                </Dialog.Close>
              </div>
              <TransformWrapper>
                <TransformComponent>
                  <img
                    src={image}
                    alt={room}
                    className="w-full"
                  />
                </TransformComponent>
              </TransformWrapper>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <div className="absolute py-2 px-6 left-0 bottom-0 w-full">
            <div className="absolute bottom-full left-0 w-full">
              <div className="flex w-full items-baseline">
                <div className="h-px bg-white grow"></div>
                <svg width="57" height="28" viewBox="0 0 57 28" fill="#222222" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M56.458 27.23c-5.204 0-9.428-4.23-9.428-9.44v-3.37C47.03 7.01 41.027 1 33.627 1H22.83C15.43 1 9.428 7.01 9.428 14.42v3.37c0 5.21-4.225 9.44-9.428 9.44" stroke="#fff" /></svg>
                <div className="h-px bg-white w-2 -translate-x-0.5"></div>
              </div>
            </div>
            <button className="absolute bottom-full cursor-pointer size-10 flex items-center justify-center right-4 pt-4 border-b border-eerie-black">
              <img src={arrowUpIcon.src} alt="" />
            </button>
            <span>La mano descansa sobre el torso de una mujer, de la cual solo se observa esta sección del cuerpo.</span>
          </div>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-eerie-black/40 z-10" />
          <Drawer.Content className="flex flex-col mt-24 h-[80%] lg:h-[320px] fixed bottom-0 left-0 right-0 outline-none z-10">
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
                  <Drawer.Title>Detalle fotografía</Drawer.Title>
                </VisuallyHidden.Root>
                <div className="space-y-5">
                  <p>Mujer sentada en una mecedora, inclinada hacia adelante, con su cabeza baja y las manos reposando suavemente sobre la silla en la que se está sentada. La figura está iluminada desde atrás, lo que crea un efecto de contraluz que perfila su silueta de manera clara. El fondo de la imagen está compuesto por una estructura geométrica que parece una ventana con divisiones rectangulares, lo que añade un contraste interesante entre la rigidez de las líneas y la suavidad del cuerpo relajado de la mujer. La mujer fotografiada es Saskia Esbra, hija de la artista. La fotografía habla del espacio privado y la intimidad femenina. El uso del contraluz no solo perfila su figura, sino que también la oculta parcialmente, lo que podría hablar sobre la agencia en la autorrepresentación, donde la figura no está completamente disponible para la mirada del espectador, manteniendo su autonomía y espacio personal.</p>
                  <div className="space-y-1">
                    <h3 className="italic font-antarctican-mono">Fecha</h3>
                    <p>1976</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="italic font-antarctican-mono">Fotógrafa</h3>
                    <p>Esbra, Ida, 1929-2009</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="italic font-antarctican-mono">Fuente</h3>
                    <p>Colección Jan y Saskia Esbra</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="italic font-antarctican-mono">Fuente</h3>
                    <p>Colección Jan y Saskia Esbra</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="italic font-antarctican-mono">Cobertura geográfica</h3>
                    <p>Barranquilla, Atlántico</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="italic font-antarctican-mono">Soporte físico</h3>
                    <p>Fotografía análoga</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="italic font-antarctican-mono">Técnica</h3>
                    <p>Gelatina de plata</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="italic font-antarctican-mono">Declaración de derechos</h3>
                    <p>© Derechos reservados. Herederos de Ida Esbra.</p>
                  </div>
                </div>
                <div className="flex justify-center mt-10">
                  <button type="button" className="px-4 font-antarctican-mono uppercase border-b pb-2">
                    Descargar metadatos
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
