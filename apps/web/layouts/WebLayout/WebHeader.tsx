import { useRouter } from 'next/router'
import React, { useRef } from 'react'

import { API_ROUTES, ROUTES } from '@/lib/constants'
import Sidebar from '@/components/Sidebar/Sidebar'
import { useModal } from 'ui'

interface WebHeaderProps {
  isLoading?: boolean
  headerItem?: JSX.Element
}

export function WebHeader({ isLoading, headerItem }: WebHeaderProps) {
  console.log('header', headerItem)
  const { setVisible, bindings } = useModal()

  const openSidebar = () => {
    setVisible(true)
  }

  return (
    <>
      <nav>
        <div className="flex items-center justify-between">
          <img
            className="m-3 h-10 w-10"
            src="https://jie-site.oss-cn-shenzhen.aliyuncs.com/f5e9daab2336e4794876d9826fb45260_512_512__1_-removebg-preview.svg"
            alt=""
            onClick={openSidebar}
          />
          {headerItem}
        </div>
      </nav>
      <Sidebar modalBindings={bindings} />
    </>
  )
}
