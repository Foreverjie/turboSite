import React, { forwardRef } from 'react'
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
  DotsCircleHorizontalIcon,
} from '@heroicons/react/outline'
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
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <Modal
        scroll
        blur
        left
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...modalBindings}
      >
        {/* <Modal.Header>
          <Text id="modal-title" size={18}>
            New Post
          </Text>
        </Modal.Header> */}
        <Modal.Body>
          <SidebarRow Icon={HomeIcon} title="Home" />
          <SidebarRow Icon={HashtagIcon} title="Explore" />
          <SidebarRow Icon={BellIcon} title="Notifications" />
          <SidebarRow Icon={MailIcon} title="Messages" />
          <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
          <SidebarRow Icon={CollectionIcon} title="Lists" />
          <SidebarRow Icon={UserIcon} title="Sign In" />

          <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={newPost}>Post</Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  )
}

export default Sidebar
