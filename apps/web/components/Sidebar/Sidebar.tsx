import React, { forwardRef } from 'react'
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  InboxIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/24/outline'
import SidebarRow from './SidebarRow'
import { Modal, Text, useModal, Button, Textarea, Loading } from 'ui'

function Sidebar({
  modalBindings,
}: {
  modalBindings: {
    open: boolean
    onClose: () => void
  }
}) {
  return (
    <Modal
      scroll
      blur
      left
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      {...modalBindings}
    >
      <Modal.Body>
        <SidebarRow Icon={HomeIcon} title="Home" />
        <SidebarRow Icon={HashtagIcon} title="Explore" />
        <SidebarRow Icon={BellIcon} title="Notifications" />
        <SidebarRow Icon={InboxIcon} title="Messages" />
        <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
        <SidebarRow Icon={UserIcon} title="Sign In" />
      </Modal.Body>
    </Modal>
  )
}

export default Sidebar
