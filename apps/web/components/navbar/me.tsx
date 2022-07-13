import Avatar from '../avatar'
import { DotsHorizontalIcon } from '@heroicons/react/solid'

const Me = () => {
  return (
    <div className="flex items-center justify-between desktop:w-[17rem] hover:bg-neutral-200 desktop:px-4 px-3 py-3 rounded-full hover-transition cursor-pointer">
      <div className="flex items-center gap-4">
        <Avatar
          src="https://images.unsplash.com/photo-1614639437280-558b05b13939?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM0fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="Profile"
        />
        <div className="desktop:block hidden">
          <h1 className="font-bold text-lg">Jasmin Chew</h1>
          <h2 className="text-neutral-500 -mt-1">@jasminchew</h2>
        </div>
      </div>
      <DotsHorizontalIcon className="w-4 h-4 text-neutral-500 desktop:block hidden" />
    </div>
  )
}

export default Me
