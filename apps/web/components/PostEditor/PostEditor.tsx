import React, { useState } from 'react'
import { Button, Textarea } from 'ui'
import { trpc } from '../../utils/trpc'
import { ImageIcon, MapPinIcon } from 'lucide-react'
import { UploadButton } from '~/utils/uploadthing'

const PostEditor = ({ onPostAdded }: { onPostAdded?: () => void }) => {
  const utils = trpc.useContext()
  const newPost = trpc.post.new.useMutation({
    onSuccess: () => {
      utils.post.all.invalidate()
    },
  })

  const [post, setPost] = useState('')

  const addPost = async () => {
    if (!post) return
    await newPost.mutateAsync({ content: post })
    setPost('')
    onPostAdded && onPostAdded()
  }

  const handleImageClick = () => {}
  const handleLocationClick = () => {}

  return (
    <>
      <Textarea
        className="flex flex-1"
        value={post}
        onChange={e => {
          setPost(e.target.value)
        }}
      />
      <div className="flex justify-between">
        <div className="flex items-center justify-start">
          <ImageIcon className="mr-2" onClick={handleImageClick} />
          <MapPinIcon className="mr-2" onClick={handleLocationClick} />
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={res => {
              // Do something with the response
              console.log('Files: ', res)
              alert('Upload Completed')
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`)
            }}
          />
        </div>
        <Button onClick={addPost} loading={newPost.isLoading}>
          Post
        </Button>
      </div>
    </>
  )
}

export default PostEditor
