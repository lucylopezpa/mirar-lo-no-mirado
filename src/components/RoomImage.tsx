import { useState, type FC } from "react"
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
    <Section className="relative p-0">
      <div className="grow"></div>
      <div className="px-8 relative">
        <img
          src={image}
          alt={room}
          className="w-full max-w-lg h-auto shadow-lg"
        />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button type="button" className="bottom-2 left-10 absolute">
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
              <div className="absolute top-4 right-8">
                <Dialog.Close>
                  <img src={xIcon.src} className="size-8"  alt="" />
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
      <div className="grow"></div>
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <div className="relative py-2 px-8">
            <div className="absolute bottom-full left-0 w-full">
              <div className="flex w-full items-baseline">
                <div className="h-px bg-white grow"></div>
                <svg width="57" height="28" viewBox="0 0 57 28" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M56.458 27.23c-5.204 0-9.428-4.23-9.428-9.44v-3.37C47.03 7.01 41.027 1 33.627 1H22.83C15.43 1 9.428 7.01 9.428 14.42v3.37c0 5.21-4.225 9.44-9.428 9.44" stroke="#fff" /></svg>
                <div className="h-px bg-white w-2 -translate-x-0.5"></div>
              </div>
            </div>
            <button className="absolute bottom-full cursor-pointer size-10 flex items-center justify-center right-4 pt-4">
              <img src={arrowUpIcon.src} alt="" />
            </button>
            <span>La mano descansa sobre el torso de una mujer, de la cual solo se observa esta sección del cuerpo.</span>
          </div>
        </Drawer.Trigger>
        <Drawer.Content className="bg-eerie-black h-fit fixed bottom-0 left-0 right-0 outline-none">
          <VisuallyHidden.Root>
            <Drawer.Title>Demo</Drawer.Title>
          </VisuallyHidden.Root>
          <Drawer.Description asChild>
            <div className="relative py-2 px-8">
              <div className="absolute bottom-full left-0 w-full">
                <div className="flex w-full items-baseline">
                  <div className="h-px bg-white grow"></div>
                  <svg width="57" height="28" viewBox="0 0 57 28" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M56.458 27.23c-5.204 0-9.428-4.23-9.428-9.44v-3.37C47.03 7.01 41.027 1 33.627 1H22.83C15.43 1 9.428 7.01 9.428 14.42v3.37c0 5.21-4.225 9.44-9.428 9.44" stroke="#fff" /></svg>
                  <div className="h-px bg-white w-2 -translate-x-0.5"></div>
                </div>
              </div>
              <Drawer.Close className="absolute bottom-full cursor-pointer size-10 flex items-center justify-center right-4 pt-4">
                <img src={arrowUpIcon.src} className="rotate-180" alt="" />
              </Drawer.Close>
              <p>La mano descansa sobre el torso de una mujer, de la cual solo se observa esta sección del cuerpo. La posición de la mano, con una alianza matrimonial en su dedo anular, destaca un detalle íntimo y personal. La suavidad de los pliegues de la tela que la rodea y la iluminación tenue crean una atmósfera de quietud y contemplación.</p>
            </div>
          </Drawer.Description>
        </Drawer.Content>
      </Drawer.Root>
    </Section>
  )
}

export default RoomImage
