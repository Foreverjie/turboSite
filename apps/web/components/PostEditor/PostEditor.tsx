'use client'

import React, { useCallback, useState } from 'react'
import { Button, Progress, Textarea, toast } from 'ui'
import { trpc } from '../../utils/trpc'
import { ImageIcon, MapPinIcon, XIcon } from 'lucide-react'
import { UploadButton } from '~/utils/uploadthing'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const PostEditor = ({ onPostAdded }: { onPostAdded?: () => void }) => {
  const utils = trpc.useUtils()
  const newPost = trpc.post.new.useMutation({
    onSuccess: () => {
      utils.post.all.invalidate()
    },
  })

  const [progress, setProgress] = useState(0)
  const [files, setFiles] = useState<string[]>([
    // 'https://utfs.io/f/559b5383-81b3-4bb7-8f57-df773c3396a2-d15hxz.png',
    // 'https://utfs.io/f/f8283c93-3d7b-4fab-a848-b64e3e5fdf27-fqinaq.png',
    // 'https://utfs.io/f/559b5383-81b3-4bb7-8f57-df773c3396a2-d15hxz.png',
    // 'https://utfs.io/f/f8283c93-3d7b-4fab-a848-b64e3e5fdf27-fqinaq.png',
  ])

  const [post, setPost] = useState('')

  const addPost = async () => {
    if (!post) return
    await newPost.mutateAsync({ content: post, files })
    setPost('')
    onPostAdded && onPostAdded()
  }

  const handleImageClick = () => {}
  const handleLocationClick = () => {}

  const UploadProgress = useCallback(() => {
    return <Progress value={progress} />
  }, [progress])

  return (
    <>
      <Textarea
        className="flex flex-1"
        value={post}
        onChange={e => {
          setPost(e.target.value)
        }}
      />

      {files.length > 0 && (
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={24}
          className="photo-swiper m-0 flex items-center justify-start"
        >
          {files.map((file, i) => (
            <SwiperSlide key={i} className="w-fit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="h-24 aspect-auto"
                src={file}
                alt="Image"
                onClick={handleImageClick}
              />
              <button
                className="absolute top-0 right-0 mt-1 mr-1"
                onClick={() => {
                  const newFiles = [...files]
                  newFiles.splice(i, 1)
                  setFiles(newFiles)
                }}
              >
                <XIcon size={16} />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="flex justify-between">
        <div className="flex items-center justify-start">
          <UploadButton
            className="ut-button:bg-transparent ut-button:w-fit ut-button:h-fit ut-allowed-content:hidden mr-2"
            endpoint="imageUploader"
            content={{
              button: <ImageIcon />,
            }}
            onUploadBegin={() => {
              // toast.info(<UploadProgress />)
            }}
            onUploadProgress={progress => {
              setProgress(progress)
            }}
            onClientUploadComplete={res => {
              const newFiles = [...files]
              setProgress(0)
              res?.map(r => {
                newFiles.push(r.url)
              })
              setFiles(newFiles)
              // toast({
              //   description: 'Upload Success!',
              // })
            }}
            onUploadError={(error: Error) => {
              // toast({
              //   title: 'Error',
              //   variant: 'destructive',
              //   description: error.message || 'Something went wrong',
              // })
            }}
          />
          <MapPinIcon className="mr-2" onClick={handleLocationClick} />
        </div>
        <Button onClick={addPost} loading={newPost.isLoading}>
          Post
        </Button>
      </div>
    </>
  )
}

export default PostEditor
