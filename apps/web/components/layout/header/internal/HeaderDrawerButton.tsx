'use client'

import { useState } from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTrigger,
  ButtonMotionBase,
} from 'ui'
import { AnimatePresence } from 'motion/react'

import { XIcon } from 'lucide-react'
// import { DialogOverlay } from '~/components/ui/dialog/DialogOverlay'
import { useIsClient } from '~/hooks/common/use-is-client'

import { HeaderActionButton } from './HeaderActionButton'
import { HeaderDrawerContent } from './HeaderDrawerContent'

export const HeaderDrawerButton = () => {
  const [open, setOpen] = useState(false)

  const isClient = useIsClient()
  const ButtonElement = (
    <HeaderActionButton>
      <i className="i-mingcute-menu-line" />
    </HeaderActionButton>
  )
  if (!isClient) return ButtonElement

  return (
    <Sheet open={open} onOpenChange={open => setOpen(open)}>
      <SheetTrigger asChild>{ButtonElement}</SheetTrigger>
      <SheetContent forceMount>
        <div>
          <AnimatePresence>
            {open && (
              <>
                <SheetClose asChild>
                  <ButtonMotionBase
                    aria-label="Close Header Drawer"
                    className="absolute right-0 top-0 z-[9] p-8"
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
                    <XIcon />
                  </ButtonMotionBase>
                </SheetClose>

                <HeaderDrawerContent setOpen={setOpen} />
              </>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  )
}
