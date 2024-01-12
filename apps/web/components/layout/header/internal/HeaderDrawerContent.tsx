'use client'

import { Dispatch, SetStateAction, memo } from 'react'
import { m } from 'framer-motion'
import Link from 'next/link'

import { reboundPreset } from 'ui/src/transition/spring'

import { useHeaderConfig } from './HeaderDataConfigureProvider'

export const HeaderDrawerContent = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const { config } = useHeaderConfig()

  return (
    <div className="mt-12 max-h-screen w-[90vw] space-y-4 overflow-auto pb-24 scrollbar-none">
      {config.map((section, index) => {
        return (
          <m.section
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              ...reboundPreset,
              delay: index * 0.08,
            }}
            key={section.path}
          >
            <Link
              className="block"
              href={section.path}
              onClick={() => setOpen(false)}
            >
              <span className="flex items-center space-x-2 py-2 text-lg">
                <i>{section.icon}</i>
                <h2>{section.title}</h2>
              </span>
            </Link>

            {section.subMenu && (
              <ul className="my-2 grid grid-cols-2 gap-2">
                {section.subMenu.map(sub => {
                  return (
                    <li key={sub.path}>
                      <Link
                        className="inline-block p-2"
                        href={sub.path}
                        onClick={() => setOpen(false)}
                      >
                        {sub.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </m.section>
        )
      })}
    </div>
  )
}
