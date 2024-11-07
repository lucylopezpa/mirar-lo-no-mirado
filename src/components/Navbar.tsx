import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { useEffect, useState } from 'react'
import menuIcon from "../icons/menu.svg"
import xIcon from "../icons/x.svg"
import externalIcon from "../icons/external.svg"
import arrowRight from "../icons/arrow-right.svg"

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <nav className="px-8 py-4 shrink-0 flex items-center justify-between">
      <a href="/" className="font-salo text-4xl inline-flex flex-col items-start shrink-0">
        <img src="/logo.svg" className="dark:hidden" alt="Página de inicio" />
        <img src="/logo-black.svg" className="hidden dark:block" alt="Página de inicio" />
      </a>
      <Dialog.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <Dialog.Trigger asChild>
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-label="Open main menu"
          >
            <img src={menuIcon.src} className="block h-6 w-6" aria-hidden="true" />
          </button>
        </Dialog.Trigger>

        {/* Mobile Menu Dialog */}
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-eerie-black bg-opacity-25" />
          <Dialog.Content className="fixed inset-0 z-50 flex flex-col bg-eerie-black">
            <VisuallyHidden.Root>
              <Dialog.Title>Menú</Dialog.Title>
              <Dialog.Description>Menú con enlaces para navegar a las diferentes secciones de la página</Dialog.Description>
            </VisuallyHidden.Root>
            <div className="px-8 py-4 shrink-0 flex items-center justify-between">
              <a href="/" className="font-salo text-4xl inline-flex flex-col items-start shrink-0">
                <img src="/logo.svg" className="dark:hidden" alt="Página de inicio" />
                <img src="/logo-black.svg" className="hidden dark:block" alt="Página de inicio" />
              </a>
              <Dialog.Close asChild>
                <button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  aria-label="Close menu"
                >
                  <img src={xIcon.src} className="h-6 w-6" aria-hidden="true" />
                </button>
              </Dialog.Close>
            </div>
            <div className="flex-grow overflow-y-auto flex flex-col justify-center">
              <ul className='border-y divide-y divide-floral-white'>
                <li className=''>
                  <a href="" className='px-8 flex items-center justify-between py-5'>
                    <span className='inline-flex flex-col'>
                      <span className='font-antarctican-mono uppercase'>Sala 1</span>
                      <span className='text-2xl italic'>Fragmentos de lo femenino</span>
                    </span>
                    <img src={externalIcon.src} className="size-14" alt="" />
                  </a>
                </li>
                <li className=''>
                  <a href="" className='px-8 flex items-center justify-between py-5'>
                    <span className='inline-flex flex-col'>
                      <span className='font-antarctican-mono uppercase'>Sala 2</span>
                      <span className='text-2xl italic'>Somos el resultado de lo que vemos</span>
                    </span>
                    <img src={externalIcon.src} className="size-14" alt="" />
                  </a>
                </li>
                <li className=''>
                  <a href="" className='px-8 flex items-center justify-between py-5'>
                    <span className='inline-flex flex-col'>
                      <span className='font-antarctican-mono uppercase'>Sala 3</span>
                      <span className='text-2xl italic'>Caribe experimental</span>
                    </span>
                    <img src={externalIcon.src} className="size-14" alt="" />
                  </a>
                </li>
                <li className=''>
                  <a href="/sobre-ida-esbra" className='px-8 flex items-center justify-between py-5'>
                    <span className='inline-flex flex-col'>
                      <span className='font-antarctican-mono uppercase'>Conoce</span>
                      <span className='text-2xl italic'>Sobre Ida Esbra</span>
                    </span>
                    <img src={externalIcon.src} className="size-14" alt="" />
                  </a>
                </li>
                <li className=''>
                  <a href="/sobre-el-proyecto" className='px-8 flex items-center justify-between py-5'>
                    <span className='inline-flex flex-col'>
                      <span className='font-antarctican-mono uppercase'>Conoce</span>
                      <span className='text-2xl italic'>Sobre el proyecto</span>
                    </span>
                    <img src={externalIcon.src} className="size-14" alt="" />
                  </a>
                </li>
                <li className='/sobre-la-grafica'>
                  <a href="" className='px-8 flex items-center justify-between py-5'>
                    <span className='inline-flex flex-col'>
                      <span className='font-antarctican-mono uppercase'>Conoce</span>
                      <span className='text-2xl italic'>Sobre la gráfica</span>
                    </span>
                    <img src={externalIcon.src} className="size-14" alt="" />
                  </a>
                </li>
              </ul>
              <a href="/aviso-legal" className='flex gap-2 px-8 mt-6 items-center font-antarctican-mono uppercase'>
                <span>Aviso legal</span>
                <img src={arrowRight.src} className='size-8' alt="" />
              </a>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </nav>
  )
}

export default Navbar
