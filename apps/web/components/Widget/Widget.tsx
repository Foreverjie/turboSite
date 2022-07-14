import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'

function Widget() {
  return (
    <div className="col-span-2 mt-2 px-2 hidden lg:inline">
      <div className="mt-2 flex items-center space-x-2 rounded-full bg-gray-100 p-3">
        <SearchIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          className="bg-transparent flex-1 outline-none"
          placeholder="Search Post"
        />
      </div>
    </div>
  )
}

export default Widget
